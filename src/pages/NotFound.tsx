import styled from '@emotion/styled';
import SampleLottie from '@/shared/assets/lotties/404 error.lottie';
import DotLottiePlayer from '@aarsteinmedia/dotlottie-react';
import { Link } from 'react-router-dom';

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackBtn = styled.div`
  background-color: ${({ theme }) => theme.colors.green.green6};
  color: ${({ theme }) => theme.colors.gray.gray3};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius4};
`;

function NotFound() {
  return (
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
      <Link to="/dashboard">
        <BackBtn>대시보드로 돌아가기</BackBtn>
      </Link>
    </NotFoundWrapper>
  );
}

export default NotFound;
