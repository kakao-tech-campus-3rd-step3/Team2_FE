import styled from '@emotion/styled';
import PullItLogo from '@/shared/components/PullItIntroLogo';
import FeatureList from '@/features/login/components/FeatureList';

const LeftSide = styled.div`
  width: 50%;
  background-color: #e2ffeaff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  margin-left: -8px;
`;

const Title = styled.h2`
  font-size: 24px;
  padding: 20px 0px;
`;

const Subtitle = styled.span`
  font-size: 13px;
  padding: 0px 0px 20px 0px;
  color: #16a34a;
`;

const Description = styled.p`
  line-height: 1.875rem;
  font-size: 1.125rem;
  margin-bottom: 20px;
  color: #464646ff;
`;

const LeftPanel = () => (
  <LeftSide>
    <LeftContent>
      <LogoWrapper>
        <PullItLogo />
      </LogoWrapper>
      <Title>PDF 한 장으로</Title>
      <Subtitle>완벽한 학습</Subtitle>
      <Description>
        AI가 PDF를 분석해서 맞춤형 문제를 자동 생성하고,
        <br />
        오답노트를 제공해 효과적인 복습을 도와드려요.
      </Description>
      <FeatureList />
    </LeftContent>
  </LeftSide>
);

export default LeftPanel;
