import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { CheckCircle2, Trophy, Star } from 'lucide-react';

const ping = keyframes`
  0% { transform: scale(1); opacity: 1; }
  75%, 100% { transform: scale(2); opacity: 0; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10%); }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: fit-content;
`;

const CenterWrapper = styled.div`
  position: relative;
`;

const GradientCircle = styled.div`
  width: 7rem; // 112px = w-28
  height: 7rem;
  border-radius: 50%;
  background: linear-gradient(to right, #22c55e, #10b981); // from-green-500 to-emerald-500
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(34, 197, 94, 0.25); // shadow-green-500/25
`;

const CheckIcon = styled(CheckCircle2)`
  width: 3.5rem; // 56px = w-14
  height: 3.5rem;
  color: white;
`;

// 링들
const PulseRing = styled.div<{
  delay?: string;
  borderWidth: string;
  borderColor: string;
  inset: string;
}>`
  position: absolute;
  border-radius: 9999px;
  border-style: solid;
  animation: ${ping} 1.5s infinite;
  opacity: 0.75;
  animation-delay: ${({ delay }) => delay || '0s'};
  border-width: ${({ borderWidth }) => borderWidth};
  border-color: ${({ borderColor }) => borderColor};
  inset: ${({ inset }) => inset};
`;

const IconBubble = styled.div<{ size: string; bg: string; delay?: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: ${({ bg }) => bg};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${bounce} 1.2s infinite;
  animation-delay: ${({ delay }) => delay || '0s'};
`;

const TrophyWrapper = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
`;

const StarWrapper = styled.div`
  position: absolute;
  bottom: -0.5rem;
  left: -0.5rem;
`;

const Celebration = () => {
  return (
    <Wrapper>
      <CenterWrapper>
        <GradientCircle>
          <CheckIcon />
        </GradientCircle>
        {/* Pulse Rings */}
        <PulseRing inset="0" borderWidth="4px" borderColor="#86efac" /> {/* border-green-300 */}
        <PulseRing inset="-0.5rem" borderWidth="2px" borderColor="#bbf7d0" delay="0.5s" />{' '}
        {/* border-green-200 */}
        <PulseRing inset="-1rem" borderWidth="1px" borderColor="#dcfce7" delay="1s" />{' '}
        {/* border-green-100 */}
      </CenterWrapper>

      <TrophyWrapper>
        <IconBubble size="2rem" bg="#facc15">
          <Trophy size={16} color="white" />
        </IconBubble>
      </TrophyWrapper>

      <StarWrapper>
        <IconBubble size="1.5rem" bg="#c084fc" delay="0.3s">
          <Star size={12} color="white" />
        </IconBubble>
      </StarWrapper>
    </Wrapper>
  );
};

export default Celebration;
