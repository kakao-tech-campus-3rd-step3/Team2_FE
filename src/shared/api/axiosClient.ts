import axios from 'axios';
import type { AxiosInstance } from 'axios';

const resolveBaseURL = (): string => {
  // 프록시가 '/api'로 시작하는 요청만 가로채므로 항상 '/api' 고정
  return '/api';
};

export const api: AxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
});
