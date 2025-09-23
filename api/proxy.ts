import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios, { type AxiosError } from 'axios';

const { API_BASE_URL, BASIC_USER, BASIC_PASS } = process.env;

// --- 유틸리티 함수 ---

function createAuthToken(): string {
  return Buffer.from(`${BASIC_USER}:${BASIC_PASS}`).toString('base64');
}

function getApiTargetUrl(requestUrl: string | undefined): string {
  return `${API_BASE_URL}${requestUrl || ''}`;
}

/**
 * 백엔드로 전달할 헤더 객체를 생성합니다.
 * @param originalHeaders - VercelRequest에서 받은 원본 헤더
 * @param token - Basic 인증 토큰
 */
function buildForwardHeaders(
  originalHeaders: VercelRequest['headers'],
  token: string,
): { [key: string]: string } {
  const headers: { [key: string]: string } = {
    Authorization: `Basic ${token}`,
  };
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
  const token = createAuthToken();

  try {
    const headers = buildForwardHeaders(originalHeaders, token);

    const sseResponse = await axios({
      method,
      url: targetUrl,
      headers,
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
async function handleApiRequest(request: VercelRequest, response: VercelResponse) {
  const { method, body, headers: originalHeaders } = request;
  const targetUrl = getApiTargetUrl(request.url);
  const token = createAuthToken();

  try {
    const headers = buildForwardHeaders(originalHeaders, token);

    const axiosResponse = await axios({
      method: method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      url: targetUrl,
      headers,
      data: body,
    });

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
  if (request.url?.includes('/api/notifications/subscribe')) {
    await handleSseRequest(request, response);
  } else {
    await handleApiRequest(request, response);
  }
}
