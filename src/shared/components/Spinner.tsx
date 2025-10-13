import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Brain } from 'lucide-react';

// 전역 스피너

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  z-index: 9999;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 6rem;
  height: 6rem;
`;

const OuterRing = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 4px solid ${({ theme }) => theme.colors.gray.gray3};
`;

const AnimatedRing = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 4px solid transparent;
  border-top-color: ${({ theme }) => theme.colors.semantic.primary};
  animation: ${spin} 1s linear infinite;
`;

const IconWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBrain = styled(Brain)`
  width: 2rem;
  height: 2rem;
  color: ${({ theme }) => theme.colors.semantic.primary};
`;

const Spinner = () => (
  // 브라우저 정 가운데의 스피너
  <FullScreenWrapper>
    <SpinnerWrapper>
      <OuterRing />
      <AnimatedRing />
      <IconWrapper>
        <StyledBrain />
      </IconWrapper>
    </SpinnerWrapper>
  </FullScreenWrapper>
);

export default Spinner;
