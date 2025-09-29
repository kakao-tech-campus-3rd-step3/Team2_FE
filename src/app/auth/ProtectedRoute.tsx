import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';
import { ROUTES } from '@/app/routePaths';
import Spinner from '@/features/create/components/Spinner'; // 전역 스피너로 대체 가능

const ProtectedRoute = () => {
  const { isAuthenticated, isAuthLoading } = useAuth(); // isLoading -> isAuthLoading

  if (isAuthLoading) {
    // AuthProvider가 인증 상태를 확인하는 동안에는 *반드시* 로딩 화면만 표시합니다.
    // 이 단계에서 성급하게 리다렉트 결정을 내리지 않는 것이 핵심입니다.
    return <Spinner />;
  }

  if (!isAuthenticated) {
    // 로딩이 끝난 후, 인증되지 않은 것이 확실해지면 로그인 페이지로 리다이렉트합니다.
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // 로딩이 끝났고, 인증된 것이 확실하면 요청된 페이지를 렌더링합니다.
  return <Outlet />;
};

export default ProtectedRoute;
