import styled from '@emotion/styled';
import SampleLottie from '@/shared/assets/lotties/sample.lottie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFoundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NotFound() {
  return (
    <NotFoundWrapper>
      <div style={{ width: 200, height: 200, margin: '0 auto' }}>
        <DotLottieReact src={SampleLottie} loop autoplay />
      </div>
    </NotFoundWrapper>
  );
}

export default NotFound;
