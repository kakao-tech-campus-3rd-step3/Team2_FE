import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../shared/api/apiClient';
import { setToken } from '../shared/utils/tokenManager';

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await apiClient.post('/auth/refresh');
        const token = response.data.accessToken as string;
        setToken(token); // 클로저에 저장
        navigate('/'); // 메인 페이지로 리다이렉트
      } catch (error) {
        console.error('토큰 발급 실패:', error);
        navigate('/login'); // 로그인 페이지로
      }
    };
    void getAccessToken();
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default LoginSuccess;
