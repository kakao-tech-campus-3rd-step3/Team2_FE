import styled from '@emotion/styled';
import PullItLogo from '@/shared/components/PullItIntroLogo';
import { BarChart3, CheckCircle, FileText, Target } from 'lucide-react';

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`;

const LeftSide = styled.div`
  width: 50%;
  background-color: #e2ffeaff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const RightSide = styled.div`
  width: 50%;
  background-color: #ffffffc0;
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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(CheckCircle)`
  width: 1rem;
  height: 1rem;
  color: #10b981;
`;

const TextWrapper = styled.div``;

const FeatureTitle = styled.h3`
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const FeatureDescription = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin: 0.25rem 0 0 0;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Button = styled.button`
  width: 100%;
  height: 3.5rem;
  border: none;
  background-color: #fee500;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const KakaoButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
`;

const BenefitSection = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
`;

const BenefitTitle = styled.h4`
  font-weight: 600;
  color: #111827;
  font-size: 0.925rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  margin-bottom: 5px;
  color: #4b5563;
`;

const BottomNote = styled.div`
  text-align: center;
  font-size: 0.75rem;
  color: #9ca3af;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
`;

const TermsText = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: #919191ff;
  line-height: 1.6;
  margin-top: 20px;
`;

const LinkButton = styled.button`
  color: #16a34a;
  font-weight: 500;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const CardHeader = styled.div`
  text-align: center;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: #111827;
  margin: 0;
`;

const CardDescription = styled.p`
  color: #4b5563;
  margin: 0;
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

const Login = () => {
  return (
    <Container>
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
          <FeatureGrid>
            <FeatureItem>
              <IconWrapper>
                <FileText size={24} color="#10b981" />
              </IconWrapper>
              <TextWrapper>
                <FeatureTitle>스마트 PDF 분석</FeatureTitle>
                <FeatureDescription>
                  AI가 자동으로 핵심 개념을 추출하고 문제를 생성합니다
                </FeatureDescription>
              </TextWrapper>
            </FeatureItem>
            <FeatureItem>
              <IconWrapper>
                <Target size={24} color="#10b981" />
              </IconWrapper>
              <TextWrapper>
                <FeatureTitle>맞춤형 문제 생성</FeatureTitle>
                <FeatureDescription>
                  난이도와 문제 유형을 선택해 최적화된 학습을 경험하세요
                </FeatureDescription>
              </TextWrapper>
            </FeatureItem>
            <FeatureItem>
              <IconWrapper>
                <BarChart3 size={24} color="#10b981" />
              </IconWrapper>
              <TextWrapper>
                <FeatureTitle>학습 분석 리포트</FeatureTitle>
                <FeatureDescription>
                  성취도와 약점을 분석해 효율적인 복습 계획을 제시합니다
                </FeatureDescription>
              </TextWrapper>
            </FeatureItem>
          </FeatureGrid>
        </LeftContent>
      </LeftSide>
      <RightSide>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>시작하기</CardTitle>
              <CardDescription>카카오계정으로 3초 만에 시작하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <KakaoButtonContent>
                  <svg fill="currentColor" width={24} height={24}>
                    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3Z" />
                  </svg>
                  카카오계정으로 시작하기
                </KakaoButtonContent>
              </Button>

              <BenefitSection>
                <BenefitTitle>로그인하면 이런 걸 할 수 있어요</BenefitTitle>
                <div>
                  <BenefitItem>
                    <Icon />
                    PDF 업로드 및 문제 생성
                  </BenefitItem>
                  <BenefitItem>
                    <Icon />
                    개인 맞춤형 학습 분석 리포트
                  </BenefitItem>
                  <BenefitItem>
                    <Icon />
                    오답노트와 복습 스케줄링
                  </BenefitItem>
                  <BenefitItem>
                    <Icon />
                    학습 진도 추적 및 성취도 분석
                  </BenefitItem>
                </div>
              </BenefitSection>

              <BottomNote>처음 이용하시는 경우 자동으로 회원가입됩니다</BottomNote>
            </CardContent>
          </Card>
          <TermsText>
            로그인하면 <LinkButton>이용약관</LinkButton>과 <LinkButton>개인정보처리방침</LinkButton>
            에 동의하는 것으로 간주됩니다.
          </TermsText>
        </div>
      </RightSide>
    </Container>
  );
};

export default Login;
