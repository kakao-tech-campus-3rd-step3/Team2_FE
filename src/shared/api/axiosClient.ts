import axios, {
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import { clearToken, getToken, setToken } from '../utils/tokenManager';

const baseURL = `${import.meta.env.VITE_API_BASE_URL ?? ''}/api`;
const baseUrLWithoutApi = `${import.meta.env.VITE_API_BASE_URL ?? ''}`;

const api = axios.create({
  baseURL,
  withCredentials: true, // 쿠키 전송을 위해 추가
});

export const administratorApi = axios.create({
  baseURL: baseUrLWithoutApi,
  withCredentials: true,
});

// 토큰 자동 첨부 인터셉터 (공통 로직)
const attachTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getToken();
  console.log(`[API Request] to ${config.url}:`, token ? 'Token attached' : 'No token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 요청 인터셉터 적용
api.interceptors.request.use(attachTokenInterceptor, (error) => Promise.reject(error));
administratorApi.interceptors.request.use(attachTokenInterceptor, (error) =>
  Promise.reject(error),
);

// --- 토큰 재발급 로직 중앙화 ---

/**
 * 실제로 API를 호출하여 새로운 액세스 토큰을 발급받고 저장하는 중앙화된 함수.
 * @returns 새로운 액세스 토큰
 */
export const issueNewToken = async (): Promise<string> => {
  try {
    console.log('[Token Logic] 새로운 액세스 토큰 발급을 요청합니다...');
    // `baseURL`이 `.../api`이므로, 여기서는 `/auth/refresh`를 호출해야 함
    const response = await administratorApi.post('/auth/refresh');
    const newToken = response.data.accessToken as string;
    setToken(newToken);
    console.log('[Token Logic] 액세스 토큰 발급 성공.');
    return newToken;
  } catch (error) {
    console.error('[Token Logic] 액세스 토큰 발급 실패:', error);
    clearToken();
    throw error;
  }
};

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log('[API Interceptor] 401 Unauthorized. 토큰 재발급을 시도합니다.');

      if (isRefreshing) {
        console.log('[API Interceptor] 이미 토큰 재발급이 진행 중입니다. 잠시 대기합니다.');
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await issueNewToken();
        processQueue(null, newToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
