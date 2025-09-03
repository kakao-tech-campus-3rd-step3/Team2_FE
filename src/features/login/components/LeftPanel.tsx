import styled from '@emotion/styled';
import PullItLogo from '@/shared/components/PullItIntroLogo';
import FeatureList from '@/features/login/components/FeatureList';

const LeftSide = styled.div`
  width: 50%;
  background-color: ${(props) => props.theme.colors.leftsideBackground};
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
  font-size: ${(props) => props.theme.textStyles.title1Bold.fontSize};
  padding: 20px 0px;
`;

const Subtitle = styled.span`
  font-size: 13px;
  padding: 0px 0px 20px 0px;
  color: ${(props) => props.theme.colors.primary};
`;

const Description = styled.p`
  line-height: 1.875rem;
  font-size: 1.125rem;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.cardDescription};
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
