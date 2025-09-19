import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Brain } from 'lucide-react';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 6rem; /* w-24 */
  height: 6rem; /* h-24 */
  margin: 0 auto; /* mx-auto */
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
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */
  color: ${({ theme }) => theme.colors.semantic.primary};
`;

const Spinner = () => (
  <SpinnerWrapper>
    <OuterRing />
    <AnimatedRing />
    <IconWrapper>
      <StyledBrain />
    </IconWrapper>
  </SpinnerWrapper>
);

export default Spinner;
