import styled from '@emotion/styled';
import PullItLogo from '@/shared/components/PullItIntroLogo';
import FeatureList from '@/features/login/components/FeatureList';

const LeftSide = styled.div`
  width: 50%;
  background-color: ${({ theme }) => theme.colors.green.green2};
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
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};

  padding: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing0};
  /* padding: 20px 0px; */
`;

const Subtitle = styled.span`
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
  padding: 0px 0px 20px 0px;
  color: ${({ theme }) => theme.colors.semantic.primary};
`;

const Description = styled.p`
  line-height: ${({ theme }) => theme.typography.title1Regular.lineHeight};
  font-size: ${({ theme }) => theme.typography.title1Regular.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
  color: ${({ theme }) => theme.colors.gray.gray7};
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
