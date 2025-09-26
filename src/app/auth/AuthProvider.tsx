import { useEffect, useState, type ReactNode } from 'react';
import { refreshAccessToken, getUserInfo } from '@/shared/api/apiService';
import { getToken } from '@/shared/utils/tokenManager';
import { AuthContext, type UserInfo } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // isLoading -> isAuthLoading

  useEffect(() => {
    // 이 useEffect는 앱이 최초 렌더링될 때 단 한 번만 실행되어야 합니다.
    const initializeAuth = async () => {
      try {
        console.log('[인증 공급자] 인증 상태 초기화를 시작합니다...');

        // 페이지 새로고침 시에는 쿠키의 리프레시 토큰으로 '조용한 재인증'을 시도합니다.
        // 이 과정은 메모리에 토큰이 없을 때만 실행됩니다.
        if (!getToken()) {
          console.log("[인증 공급자] '조용한 재인증(Silent Refresh)'을 시도합니다...");
          await refreshAccessToken();
        }

        // 토큰이 존재하면(원래 있었거나, 재인증에 성공했거나) 사용자 정보를 조회합니다.
        const tokenExists = !!getToken();
        if (tokenExists) {
          console.log('[인증 공급자] 사용자 정보를 조회합니다...');
          const userData = await getUserInfo();
          setUser(userData);
          console.log('[인증 공급자] 사용자 정보 조회 성공:', userData);
        } else {
          console.log('[인증 공급자] 유효한 토큰이 없어 비로그인 상태로 처리합니다.');
        }
      } catch (error) {
        console.error('[인증 공급자] 인증 초기화 과정에서 오류 발생:', error);
        setUser(null);
      } finally {
        console.log('[인증 공급자] 인증 상태 초기화가 완료되었습니다.');
        setIsAuthLoading(false); // setIsLoading -> setIsAuthLoading
      }
    };

    void initializeAuth();
  }, []); // 의존성 배열을 비워서 최초 렌더링 시에만 실행되도록 수정

  return (
    <AuthContext.Provider
      value={{ userInfo: user, isAuthenticated: !!user, isAuthLoading }} // isLoading -> isAuthLoading
    >
      {children}
    </AuthContext.Provider>
  );
};
