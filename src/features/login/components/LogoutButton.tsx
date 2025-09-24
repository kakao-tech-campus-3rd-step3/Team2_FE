import apiClient from '@/shared/api/apiClient';
import { clearToken } from '@/shared/utils/tokenManager';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout');
      clearToken(); // 클로저에서 토큰 제거
      window.location.href = '/login';
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
