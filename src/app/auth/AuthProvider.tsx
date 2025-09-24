import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { refreshAccessToken, getUserInfo } from '@/shared/api/apiService';
import { getToken } from '@/shared/utils/tokenManager';

interface User {
  name: string;
  // TODO: Add other user properties
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        let tokenExists = !!getToken();

        // 1. 메모리에 토큰이 없으면 '조용한 재인증' 시도
        if (!tokenExists) {
          await refreshAccessToken();
          tokenExists = !!getToken();
        }

        // 2. 토큰이 존재하면 (원래 있었거나, 재인증 성공했거나) 사용자 정보 조회
        if (tokenExists) {
          const userData = await getUserInfo();
          setUser(userData);
        }
      } catch (error) {
        // 재인증 또는 사용자 정보 조회 실패 시, 로그인하지 않은 상태로 간주
        console.error('Authentication initialization failed:', error);
        setUser(null);
      } finally {
        // 인증 절차가 끝나면 로딩 상태 해제
        setIsLoading(false);
      }
    };

    void initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
