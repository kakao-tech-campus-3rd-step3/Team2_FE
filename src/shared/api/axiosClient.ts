import axios from 'axios';
import type { AxiosInstance } from 'axios';

const resolveBaseURL = (): string => {
  // 개발 환경에서는 Vite 프록시가,
  // 프로덕션 환경에서는 Vercel의 rewrites 규칙과 proxy.ts 핸들러가
  // '/api'로 시작하는 요청을 가로채서 처리합니다.
  return '/api';
};

export const api: AxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
});
