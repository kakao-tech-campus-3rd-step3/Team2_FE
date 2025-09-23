// Loading.tsx

import styled from '@emotion/styled';
import { keyframes, useTheme } from '@emotion/react';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div<{ size: string }>`
  position: relative;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  margin: 0 auto;
`;

const OuterRing = styled.div<{ borderColor: string }>`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 4px solid ${({ borderColor }) => borderColor};
`;

const AnimatedRing = styled.div<{ borderTopColor: string }>`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 4px solid transparent;
  border-top-color: ${({ borderTopColor }) => borderTopColor};
  animation: ${spin} 1s linear infinite;
`;

const IconWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface LoadingProps {
  size?: string;
}

const Loading = ({ size = '6rem' }: LoadingProps) => {
  const theme = useTheme();

  return (
    <SpinnerWrapper size={size}>
      <OuterRing borderColor={theme.colors.gray.gray3} />
      <AnimatedRing borderTopColor={theme.colors.semantic.primary} />
      <IconWrapper />
    </SpinnerWrapper>
  );
};

export default Loading;
