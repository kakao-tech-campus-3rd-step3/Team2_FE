import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setToken } from '@/shared/utils/tokenManager';
import { ROUTES } from '@/app/routePaths';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log(
      '[로그인 성공 페이지] 로드 완료. URL에서 액세스 토큰을 확인합니다...',
    );
    // 1. URL 쿼리 파라미터에서 'accessToken' 값을 읽어옵니다.
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      // 2. 토큰이 존재하면, 메모리(클로저)에 저장합니다.
      console.log('[로그인 성공 페이지] URL에서 액세스 토큰 발견. 토큰을 저장합니다.');
      setToken(accessToken);
      // 3. 사용자가 뒤로 가기로 이 페이지에 다시 돌아오지 않도록 replace 옵션을 사용해 메인 페이지로 이동합니다.
      console.log('[로그인 성공 페이지] 메인 페이지로 이동합니다...');
      navigate(ROUTES.ROOT, { replace: true });
    } else {
      // 토큰이 없는 경우, 에러 처리 후 로그인 페이지로 이동합니다.
      console.error(
        '[로그인 성공 페이지] 실패: URL에서 액세스 토큰을 찾을 수 없습니다. 로그인 페이지로 이동합니다.',
      );
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [navigate, searchParams]);

  // 리다이렉트가 처리되는 동안 잠시 표시될 UI입니다.
  return <div>로그인 처리 중...</div>;
};

export default LoginSuccess;
