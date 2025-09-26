import api from './axiosClient';
import { clearToken, setToken } from '../utils/tokenManager';
import { type UserInfo } from '@/app/auth/AuthContext';

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await api.get<UserInfo>('/members/me');
    return response.data;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error; // 에러를 다시 던져서 호출부에서 처리할 수 있게 함
  }
};

export const getSources = async () => {
  try {
    const response = await api.get('/sources');
    return response.data;
  } catch (error) {
    console.error('학습 소스 조회 실패:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    clearToken(); // API 호출 성공 시 토큰 제거
    window.location.href = '/login';
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};

/**
 * 쿠키에 담긴 리프레시 토큰을 사용하여 새로운 Access Token을 발급받습니다.
 * 페이지가 새로고침되었을 때 메모리에 토큰이 없는 경우 호출됩니다.
 */
export const refreshAccessToken = async () => {
  try {
    console.log('[API 서비스] 액세스 토큰 재발급을 시작합니다...');
    const response = await api.post('/auth/refresh');
    const token = response.data.accessToken as string;
    setToken(token); // 새로 발급받은 토큰을 클로저에 저장
    console.log('[API 서비스] 액세스 토큰 재발급 성공.');
  } catch (error) {
    console.error('[API 서비스] 액세스 토큰 재발급 실패:', error);
    clearToken(); // 혹시 모를 잔여 토큰 제거
    throw error; // 에러를 다시 던져서 호출부에서 로그인 페이지로 리다이렉트 처리
  }
};

/**
 * 백엔드 API의 기본 URL을 사용하여 전체 카카오 로그인 인증 URL을 생성합니다.
 * 컴포넌트에서는 이 함수를 통해 일관된 방식으로 로그인 URL을 사용합니다.
 * @returns 프록시를 통해 전달될 전체 카카오 로그인 URL
 */
export const getKakaoLoginUrl = (): string => {
  // axiosClient에 설정된 baseURL ('/api')을 사용합니다.
  const baseURL = api.defaults.baseURL ?? '';
  return `${baseURL}/oauth2/authorization/kakao`;
};
