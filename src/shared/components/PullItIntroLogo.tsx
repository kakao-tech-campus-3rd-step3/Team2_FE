import styled from '@emotion/styled';
import BrainIconWithBadge from '@/shared/assets/IconBadge';
import TitleSection from '@/shared/assets/IconTitle';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  user-select: none;
`;

const TextGroup = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  line-height: 1.2;
  justify-content: center;
  top: -2px;
`;

const Subtitle = styled.span`
  font-size: 0.875rem;
  color: #4b5563;
`;

const PullItLogo = () => {
  return (
    <div>
      <Container>
        <BrainIconWithBadge />
        <TextGroup>
          <TitleSection />
          <Subtitle>AI Learning Platform</Subtitle>
        </TextGroup>
      </Container>
    </div>
  );
};

export default PullItLogo;
