// External libraries
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import DotLottiePlayer from '@aarsteinmedia/dotlottie-react';

// Shared components & assets
import PullItLogo from '@/shared/components/PullItIntroLogo';
import Spacer from '@/shared/components/Spacer';
import SampleLottie from '@/shared/assets/lotties/404 error.lottie';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 800px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.h2`
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
`;
const SubMessage = styled.h4`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  padding: 10px;
  color: ${({ theme }) => theme.colors.gray.gray6};
`;

const BackBtn = styled.div`
  color: ${({ theme }) => theme.colors.gray.gray6};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray5};
  padding: ${({ theme }) => theme.spacing.spacing3};
  border-radius: ${({ theme }) => theme.radius.radius3};
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: ${({ theme }) => theme.typography.body2Bold.fontWeight};
  font-size: ${({ theme }) => theme.typography.body2Bold.fontSize};
  &:hover {
    background-color: #dadadaff;
  }
`;

const DashboardBtn = styled.div`
  background-color: ${({ theme }) => theme.colors.green.green6};
  color: ${({ theme }) => theme.colors.gray.gray3};
  padding: ${({ theme }) => theme.spacing.spacing3};
  border-radius: ${({ theme }) => theme.radius.radius3};
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: ${({ theme }) => theme.typography.body2Bold.fontWeight};
  font-size: ${({ theme }) => theme.typography.body2Bold.fontSize};
  &:hover {
    background-color: #007e15;
  }
`;

function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <NotFoundWrapper>
        <div>
          <DotLottiePlayer
            style={{ width: 700, height: 500 }}
            src={SampleLottie}
            loop
            autoplay
            subframe={true}
          />
        </div>
        <Message>요청하신 페이지가 존재하지 않습니다</Message>
        <SubMessage>올바른 경로로 진입해 주세요</SubMessage>
        <Spacer height={'10px'} />
        <div style={{ display: 'flex', gap: '12px' }}>
          <BackBtn onClick={() => navigate(-1)}>이전 페이지로 돌아가기</BackBtn>
          <Link to="/dashboard">
            <DashboardBtn>대시보드로 이동</DashboardBtn>
          </Link>
        </div>
      </NotFoundWrapper>
      <Spacer height={'30px'} />
      <PullItLogo />
    </Container>
  );
}

export default NotFound;
