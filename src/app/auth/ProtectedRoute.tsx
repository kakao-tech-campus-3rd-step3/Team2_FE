import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ROUTES } from '@/app/routePaths';
import Spinner from '@/features/create/components/Spinner'; // 전역 스피너로 대체 가능

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // 인증 상태를 확인하는 동안 로딩 인디케이터를 표시
    return <Spinner />;
  }

  if (!isAuthenticated) {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // 인증된 사용자는 요청된 페이지를 렌더링
  return <Outlet />;
};

export default ProtectedRoute;
