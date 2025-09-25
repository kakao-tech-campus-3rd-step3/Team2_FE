import axios, { type AxiosRequestConfig } from 'axios';
import { clearToken, getToken, setToken } from '../utils/tokenManager';

const api = axios.create({
  baseURL: '/api', // Vite와 Vercel의 프록시를 사용
  withCredentials: true, // 쿠키 전송을 위해 추가
});

// 토큰 갱신 전용 axios 인스턴스
const refreshApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// 요청 인터셉터: 토큰 자동 첨부
api.interceptors.request.use(
  config => {
    const token = getToken();
    console.log(
      `[API Request] to ${config.url}:`,
      token ? 'Token attached' : 'No token',
    );
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터: 401 시 토큰 갱신
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log('[API Response] 401 Unauthorized. Attempting to refresh token.');

      if (isRefreshing) {
        console.log('[API Response] Token refresh is already in progress. Waiting in queue.');
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log(
          '[API 클라이언트] 새로운 액세스 토큰 발급을 요청합니다... (/api/auth/refresh)',
        );
        const response = await refreshApi.post('/auth/refresh');
        const newToken = response.data.accessToken as string;
        console.log('[API Response] Successfully refreshed token.');
        setToken(newToken);
        processQueue(null, newToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          '[API 클라이언트] 액세스 토큰 발급에 실패했습니다.',
          refreshError,
        );
        processQueue(refreshError as Error, null);
        clearToken();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
