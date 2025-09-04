import axios from 'axios';
import type { AxiosInstance } from 'axios';

// 환경 판별: 로컬(hosts 매핑 포함) 여부
const isLocalEnv = (): boolean => {
  const host = window.location.hostname;
  return host === 'local.pull.it.kr';
};

const resolveBaseURL = (): string => {
  // 프록시가 '/api'로 시작하는 요청만 가로채므로 항상 '/api' 고정
  return '/api';
};

export const api: AxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
});

// 로컬스토리지에 민감정보 저장 금지 정책에 따라 Basic 토큰 관리 기능 제거
export const isLocal = isLocalEnv;
