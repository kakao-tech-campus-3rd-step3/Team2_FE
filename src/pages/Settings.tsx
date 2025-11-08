// External libraries
import styled from '@emotion/styled';

// Auth
import { useAuth } from '@/app/auth/useAuth';

// Shared components & utils
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
  width: 600px;
  padding: ${({ theme }) => theme.spacing.spacing6};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius3};
  background-color: ${({ theme }) => theme.colors.gray.gray1};

  @media (max-width: 1050px), (max-height: 400px) {
    width: 100%;
    max-width: 600px;
    padding: ${({ theme }) => theme.spacing.spacing4};
  }
`;

const InfoTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
  color: ${({ theme }) => theme.colors.gray.gray10};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

const InfoLabel = styled.span`
  min-width: 80px;
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.gray.gray8};
`;

const InfoValue = styled.span`
  flex: 1;
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray10};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

        <Spacer height={'30px'} />
        <LogoContainer>
          <PullItLogo />
          <Spacer width={'10px'} />
        </LogoContainer>
        <Copyright>&copy; {new Date().getFullYear()} PULL IT. All rights reserved.</Copyright>
      </InfoBox>
    </Container>
  );
};

export default Settings;
