import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import BenefitList from '@/features/login/components/BenefitList';
import SampleLottie from '@/shared/assets/lotties/sample.lottie';
import { getKakaoLoginUrl } from '@/shared/api/apiService';

const RightSide = styled.div`
  width: 50%;
  background-color: ${({ theme }) => theme.colors.gray.gray1};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  border-radius: ${({ theme }) => theme.radius.radius5};
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
`;

const CardHeader = styled.div`
  text-align: center;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray10};
  margin: ${({ theme }) => theme.spacing.spacing0};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray.gray7};
  margin: ${({ theme }) => theme.spacing.spacing0};
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
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};

  color: ${({ theme }) => theme.colors.gray.gray10};

  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.subtitle2Bold.fontWeight};

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.radius.radius1};
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

const TermsText = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray10};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
  margin-top: ${({ theme }) => theme.spacing.spacing5};
`;

const LinkButton = styled.button`
  color: ${({ theme }) => theme.colors.semantic.primary};
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const RightPanel = () => {

  const handleKakaoLogin = () => {
    window.location.href = getKakaoLoginUrl();
  };

  return (
    <RightSide>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>시작하기</CardTitle>
            <div style={{ width: 200, height: 200, margin: '0 auto' }}>
              <DotLottieReact src={SampleLottie} loop autoplay />
            </div>
            <CardDescription>카카오계정으로 3초 만에 시작하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleKakaoLogin}>
              <KakaoButtonContent>
                <svg fill="currentColor" width={24} height={24}>
                  <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3Z" />
                </svg>
                카카오계정으로 시작하기
              </KakaoButtonContent>
            </Button>
            <BenefitList />
          </CardContent>
        </Card>
        <TermsText>
          로그인하면 <LinkButton>이용약관</LinkButton>과 <LinkButton>개인정보처리방침</LinkButton>에
          동의하는 것으로 간주됩니다.
        </TermsText>
      </div>
    </RightSide>
  );
};

export default RightPanel;
