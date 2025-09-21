import axios from 'axios';
import type { AxiosInstance } from 'axios';

// 환경 판별: 로컬(hosts 매핑 포함) 여부
const isLocalEnv = (): boolean => {
  const host = window.location.hostname;
  return host === 'local.pull.it.kr';
};

const resolveBaseURL = (): string => {
  // 개발 환경에서는 Vite 프록시를 사용하기 위해 '/api'를 반환합니다.
  if (import.meta.env.DEV) {
    return '/api';
  }
  // 프로덕션 환경에서는 환경 변수에 설정된 전체 URL을 사용합니다.
  /*
  프로덕션 환경(Vercel에 배포된 환경)에서는 Vite 개발 서버가 존재하지 않습니다.
  따라서 vite.config.ts에 설정한 프록시(proxy) 기능은 전혀 작동하지 않습니다.
  import.meta.env.DEV = false가 됩니다.
  import.meta.env.DEV는 vite에 내장된 변수로 개발 서버에서만 true가 됩니다.
  즉, 프로덕션 환경에서는 프록시를 거치지 않고 API 서버로 직접 요청이 전송됩니다.
  */
  return import.meta.env.VITE_API_BASE_URL;
};

export const api: AxiosInstance = axios.create({
  baseURL: resolveBaseURL(),
});

// 로컬스토리지에 민감정보 저장 금지 정책에 따라 Basic 토큰 관리 기능 제거
export const isLocal = isLocalEnv;
