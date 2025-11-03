import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Brain } from 'lucide-react';

// 전역 스피너(개선판)
// 사용자 측면에서 짧은 로딩 시간에로 스피너가 나오는 것은 UX를 저하시킨다는 의견으로
// 일정 시간(DELAY_MS) 동안 대기 후 로딩이 발생하는 식으로 변경함

const DELAY_MS = 500;

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

const SpinnerVisual = () => (
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

const Spinner = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, DELAY_MS);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return showSpinner ? <SpinnerVisual /> : null;
};

export default Spinner;
