import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios, { type AxiosError } from 'axios';

// 백엔드 API의 기본 URL
const API_BASE_URL = process.env.API_BASE_URL;

// Basic 인증 정보
const BASIC_USER = process.env.BASIC_USER;
const BASIC_PASS = process.env.BASIC_PASS;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const { url, method, body, headers: originalHeaders } = request;

  const requestPath = url?.replace('/api', '') || '';
  const targetUrl = `${API_BASE_URL}${requestPath}`;
  const token = Buffer.from(`${BASIC_USER}:${BASIC_PASS}`).toString('base64');

  try {
    // 3. 헤더를 간단한 자바스크립트 객체로 만듭니다.
    const headers: { [key: string]: string } = {
      Authorization: `Basic ${token}`,
    };

    // Content-Type 헤더가 있다면 추가합니다.
    if (originalHeaders['content-type']) {
      headers['Content-Type'] = originalHeaders['content-type'];
    }

    // Cookie 헤더가 있다면 추가합니다.
    if (originalHeaders.cookie) {
      headers.Cookie = originalHeaders.cookie;
    }

    // 4. axios는 이 간단한 헤더 객체를 처리할 수 있습니다.
    const axiosResponse = await axios({
      method: method as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      url: targetUrl,
      headers,
      data: body,
    });

    // 5. 백엔드 API의 응답을 클라이언트로 그대로 전달
    response.status(axiosResponse.status).json(axiosResponse.data);
  } catch (error) {
    console.error('Proxy Error:', error);

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
