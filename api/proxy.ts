import type { VercelRequest, VercelResponse } from '@vercel/node';

// 백엔드 API의 기본 URL
const API_BASE_URL = process.env.API_BASE_URL;

// Basic 인증 정보
const BASIC_USER = process.env.BASIC_USER;
const BASIC_PASS = process.env.BASIC_PASS;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // 1. 원본 요청 정보 가져오기
  // '/api/learning/source' -> '/learning/source'
  const requestPath = request.url?.replace('/api', '') || '';
  const targetUrl = `${API_BASE_URL}${requestPath}`;

  // 2. Basic Auth 토큰 생성
  // 이 정보는 Vercel 서버에만 저장되어 클라이언트에는 노출되지 않습니다.
  const token = Buffer.from(`${BASIC_USER}:${BASIC_PASS}`).toString('base64');

  try {
    // 3. 실제 백엔드 API로 요청 전달 (fetch 사용)
    const apiResponse = await fetch(targetUrl, {
      method: request.method,
      headers: {
        ...request.headers, // 원본 요청 헤더 복사
        Authorization: `Basic ${token}`, // Basic Auth 헤더 추가
        'Content-Type': 'application/json',
      },
      // POST, PUT 등의 요청일 경우 body를 그대로 전달
      body: request.method !== 'GET' ? JSON.stringify(request.body) : undefined,
    });

    // 4. 백엔드 API의 응답을 클라이언트로 그대로 전달
    const data = await apiResponse.json();
    response.status(apiResponse.status).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    response.status(500).json({ message: 'Error proxying to API' });
  }
}
