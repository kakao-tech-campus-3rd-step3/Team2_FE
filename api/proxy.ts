import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios, { type AxiosError } from 'axios';

const { API_BASE_URL } = process.env;

// --- 유틸리티 함수 ---

function getApiTargetUrl(requestUrl: string | undefined): string {
  const url = requestUrl || '';
  // 그 외 모든 API 요청은 기존 경로 그대로 사용
  return `${API_BASE_URL}${url}`;
}

/**
 * 백엔드로 전달할 헤더 객체를 생성합니다.
 * 클라이언트의 원본 헤더 중 필요한 것들을 그대로 전달합니다.
 * @param originalHeaders - VercelRequest에서 받은 원본 헤더
 */
function buildForwardHeaders(originalHeaders: VercelRequest['headers']): {
  [key: string]: string | string[] | undefined;
} {
  const headers: { [key: string]: string | string[] | undefined } = {};

  // 클라이언트가 보낸 Authorization 헤더(Bearer 토큰)를 그대로 전달
  if (originalHeaders.authorization) {
    headers.Authorization = originalHeaders.authorization;
  }
  if (originalHeaders['content-type']) {
    headers['Content-Type'] = originalHeaders['content-type'];
  }
  if (originalHeaders.cookie) {
    headers.Cookie = originalHeaders.cookie;
  }
  return headers;
}

// --- 요청 핸들러 ---

/**
 * SSE (Server-Sent Events) 요청을 스트리밍으로 처리합니다.
 */
async function handleSseRequest(request: VercelRequest, response: VercelResponse) {
  const { method, headers: originalHeaders } = request;
  const targetUrl = getApiTargetUrl(request.url);

  try {
    const headers = buildForwardHeaders(originalHeaders);

    const sseResponse = await axios({
      method,
      url: targetUrl,
      headers: headers as { [key: string]: string },
      responseType: 'stream', // 응답을 스트림으로 받도록 설정
    });

    response.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    // axios 응답 스트림을 클라이언트 응답으로 파이핑합니다.
    sseResponse.data.pipe(response);
  } catch (error) {
    console.error('SSE Proxy Error:', error);
    if (!response.writableEnded) {
      response.status(500).json({ message: 'SSE proxying failed' });
    }
  }
}

/**
 * 일반 API 요청을 처리합니다.
 */
async function handleApiRequest(
  request: VercelRequest,
  response: VercelResponse,
) {
  const { method, body, headers: originalHeaders } = request;
  const targetUrl = getApiTargetUrl(request.url);

  try {
    const headers = buildForwardHeaders(originalHeaders);

    const axiosResponse = await axios({
      method: method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      url: targetUrl,
      headers: headers as { [key: string]: string },
      data: body,
      // 3xx, 4xx 응답 코드를 받아도 예외를 발생시키지 않도록 설정
      validateStatus: (status) => status < 500,
    });

    // 백엔드에서 받은 Set-Cookie 헤더를 클라이언트에 전달 (필요 시 SameSite 속성 추가)
    const setCookieHeader = axiosResponse.headers['set-cookie'];

    // ================= [디버깅 로그 추가] =================
    console.log('[PROXY] Backend Response headers:', axiosResponse.headers);
    console.log('[PROXY] Original Set-Cookie header from backend:', setCookieHeader);
    // ====================================================

    if (setCookieHeader) {
      const modifiedCookies = setCookieHeader.map((cookie) => {
        let newCookie = cookie;
        // SameSite=None; Secure 속성이 없는 경우에만 추가
        if (!/SameSite/i.test(newCookie)) {
          newCookie = `${newCookie}; SameSite=None; Secure`;
        }
        
        // Path 속성이 없다면 추가 (더 넓은 범위에서 쿠키 사용 가능)
        if (!/Path/i.test(newCookie)) {
          newCookie = `${newCookie}; Path=/`;
        }

        // ================= [디버깅 로그 추가] =================
        console.log(`[PROXY] Original cookie: ${cookie}`);
        console.log(`[PROXY] Modified cookie: ${newCookie}`);
        // ====================================================
        return newCookie;
      });

      response.setHeader('Set-Cookie', modifiedCookies);
    }

    // 리다이렉트 응답 처리
    if (
      axiosResponse.status >= 300 &&
      axiosResponse.status < 400 &&
      axiosResponse.headers.location
    ) {
      response.setHeader('Location', axiosResponse.headers.location);
      response.status(axiosResponse.status).end();
      return;
    }

    response.status(axiosResponse.status).json(axiosResponse.data);
  } catch (error) {
    console.error('API Proxy Error:', error);
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      if (err.response) {
        response.status(err.response.status).json(err.response.data);
        return;
      }
    }
    response.status(500).json({ message: 'An internal server error occurred.' });
  }
}

// --- 메인 핸들러 ---

/**
 * Vercel 서버리스 함수의 메인 핸들러입니다.
 * 요청 경로를 분석하여 SSE 요청과 일반 API 요청을 분기 처리합니다.
 */
export default async function handler(request: VercelRequest, response: VercelResponse) {
  const url = request.url || '';

  // OAuth 시작 엔드포인트: /api 프리픽스를 제거하여 브라우저가 직접 이동하도록 리다이렉트
  if (url.startsWith('/api/oauth2/authorization/')) {
    const location = `${API_BASE_URL}${url.replace(/^\/api/, '')}`;
    response.status(302).setHeader('Location', location).end();
    return;
  }

  if (request.url?.includes('/api/notifications/subscribe')) {
    await handleSseRequest(request, response);
  } else {
    await handleApiRequest(request, response);
  }
}
