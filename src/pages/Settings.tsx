import styled from '@emotion/styled';
import { useAuth } from '@/app/auth/useAuth';
import { clearToken } from '@/shared/utils/tokenManager';
import { administratorApi } from '@/shared/api/axiosClient';
import Spacer from '@/shared/components/Spacer';
import PullItLogo from '@/shared/components/PullItIntroLogo';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1050px), (max-height: 400px) {
    padding: ${({ theme }) => theme.spacing.spacing4};
    justify-content: flex-start;
    padding-top: ${({ theme }) => theme.spacing.spacing6};
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
  padding: ${({ theme }) => theme.spacing.spacing4};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ theme }) => theme.colors.gray.gray1};

  @media (max-width: 1050px), (max-height: 400px) {
    width: 100%;
    max-width: 500px;
    padding: ${({ theme }) => theme.spacing.spacing3};
  }
`;

const InfoTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const InfoLabel = styled.span`
  width: 50px;
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.gray.gray8};
`;

const InfoValue = styled.span`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const LogoutButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.spacing3};
  padding: ${({ theme }) => `${theme.spacing.spacing1} ${theme.spacing.spacing3}`};
  border: none;
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ theme }) => theme.colors.red.red4};
  color: white;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};

  &:hover {
    background-color: ${({ theme }) => theme.colors.red.red4};
  }
`;
const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Copyright = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray6};
  text-align: center;
  width: 100%;
`;

const Settings = () => {
  const { userInfo } = useAuth();

  const handleLogout = async () => {
    try {
      await administratorApi.post('/auth/logout');
      clearToken();
      window.location.href = '/login';
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <Container>
      <InfoBox>
        <InfoTitle>사용자 정보</InfoTitle>

        <InfoRow>
          <InfoLabel>이름</InfoLabel>
          <InfoValue title={userInfo?.name || '로그인 필요'}>
            {userInfo?.name || '로그인 필요'}
          </InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>이메일</InfoLabel>
          <InfoValue title={userInfo?.email || '로그인 필요'}>
            {userInfo?.email || '로그인 필요'}
          </InfoValue>
        </InfoRow>

        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        <Spacer height={'20px'} />
        <LogoContainer>
          <PullItLogo />
          <Spacer width={'10px'} />
        </LogoContainer>
        <Copyright>&copy; {new Date().getFullYear()} 강원대 2팀. All rights reserved.</Copyright>
      </InfoBox>
    </Container>
  );
};

export default Settings;
