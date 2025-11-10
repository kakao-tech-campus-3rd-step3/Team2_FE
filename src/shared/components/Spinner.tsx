import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Brain } from 'lucide-react';

// 각 페이지 적용 스피너
// 사용자 측면에서 짧은 로딩 시간에로 스피너가 나오는 것은 UX를 저하시킨다는 의견으로
// 일정 시간(DELAY_MS) 동안 대기 후 로딩이 발생하는 식으로 변경함

// TIMEOUT_MS 보다 지연될 경우 DELAY_MESSAGE와 새로고침 버튼을 주어 사용자 경험 향상

const SPINNER_DELAY_MS = 800; // 0.8초
const TIMEOUT_MS = 10000; // 10초
const DELAY_MESSAGE = '응답이 평소보다 지연되고 있습니다';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const FullScreenWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

const TimeoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const TimeoutMessage = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

const RefreshButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.semantic.primary};
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const SpinnerVisual = () => (
  <SpinnerWrapper>
    <OuterRing />
    <AnimatedRing />
    <IconWrapper>
      <StyledBrain />
    </IconWrapper>
  </SpinnerWrapper>
);

const Spinner = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showTimeoutUI, setShowTimeoutUI] = useState(false);

  useEffect(() => {
    const spinnerTimer = setTimeout(() => {
      setShowSpinner(true);
    }, SPINNER_DELAY_MS);

    const timeoutTimer = setTimeout(() => {
      setShowTimeoutUI(true);
    }, TIMEOUT_MS);

    return () => {
      clearTimeout(spinnerTimer);
      clearTimeout(timeoutTimer);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!showSpinner) {
    return null;
  }

  return (
    <FullScreenWrapper>
      <SpinnerVisual />
      {showTimeoutUI && (
        <TimeoutWrapper>
          <TimeoutMessage>{DELAY_MESSAGE}</TimeoutMessage>
          <RefreshButton onClick={handleRefresh}>새로고침</RefreshButton>
        </TimeoutWrapper>
      )}
    </FullScreenWrapper>
  );
};

export default Spinner;
