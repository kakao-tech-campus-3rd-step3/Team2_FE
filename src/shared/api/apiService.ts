import api, { issueNewToken } from './axiosClient';
import { clearToken } from '../utils/tokenManager';
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
 * 페이지 로드 시 또는 필요에 따라 수동으로 토큰 갱신을 시도할 때 사용됩니다.
 */
export const refreshAccessToken = async () => {
  // 모든 토큰 재발급 로직은 이제 중앙화된 issueNewToken 함수를 호출합니다.
  await issueNewToken();
};

/**
 * 백엔드 API의 기본 URL을 사용하여 전체 카카오 로그인 인증 URL을 생성합니다.
 * 컴포넌트에서는 이 함수를 통해 일관된 방식으로 로그인 URL을 사용합니다.
 * @returns 전체 카카오 로그인 URL
 */
export const getKakaoLoginUrl = (): string => {
  const oauthBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const finalRedirectUri = `${window.location.origin}/login-success`;

  const params = new URLSearchParams();
  params.append('redirect_uri', finalRedirectUri);

  return `${oauthBaseUrl}/oauth2/authorization/kakao?${params.toString()}`;
};
