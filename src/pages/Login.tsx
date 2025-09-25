import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftPanel from '@/features/login/components/LeftPanel';
import RightPanel from '@/features/login/components/RightPanel';
import { useAuth } from '@/app/auth/AuthProvider';
import { ROUTES } from '@/app/routePaths';
import Spinner from '@/features/create/components/Spinner';

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.colors.gray.gray0};
`;

const Login = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 로딩이 완료된 후에만 리다이렉트 여부를 판단합니다.
    if (!isAuthLoading && isAuthenticated) {
      navigate(ROUTES.ROOT, { replace: true });
    }
  }, [isAuthenticated, isAuthLoading, navigate]);

  // AuthProvider의 인증 확인이 진행 중일 때는 *반드시* 로딩 화면만 표시합니다.
  if (isAuthLoading) {
    return <Spinner />;
  }

  // 로딩이 끝났고, 인증되지 않은 사용자에게만 로그인 UI를 보여줍니다.
  return (
    <Container>
      <LeftPanel />
      <RightPanel />
    </Container>
  );
};

export default Login;
