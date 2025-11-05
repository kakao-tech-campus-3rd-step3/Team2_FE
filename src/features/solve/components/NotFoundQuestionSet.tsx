import DotLottiePlayer from '@aarsteinmedia/dotlottie-react';
import ErrorLottie from '@/shared/assets/lotties/Error.lottie';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/routePaths';

const NotFoundQuestionSetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding: ${({ theme }) => theme.spacing.spacing5};
`;

const LottieWrapper = styled.div`
  width: 240px;
  height: 240px;
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.gray.gray9};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
  text-align: center;
`;

const ErrorDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  color: ${({ theme }) => theme.colors.gray.gray6};
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
  text-align: center;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.spacing3};
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => `${theme.spacing.spacing2} ${theme.spacing.spacing4}`};
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Bold.fontWeight};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant = 'secondary', theme }) =>
    variant === 'primary'
      ? `
    background-color: ${theme.colors.green.green6};
    color: white;
    border: none;
    &:hover {
      background-color: ${theme.colors.green.green5};
    }
  `
      : `
    background-color: white;
    color: ${theme.colors.gray.gray7};
    border: 1px solid ${theme.colors.gray.gray4};
    &:hover {
      background-color: ${theme.colors.gray.gray2};
    }
  `}

  &:active {
    transform: scale(0.98);
  }
`;

function NotFoundQuestionSet() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToDashboard = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <NotFoundQuestionSetWrapper>
      <LottieWrapper>
        <DotLottiePlayer src={ErrorLottie} loop autoplay subframe={true} />
      </LottieWrapper>
      <ErrorTitle>문제집을 열람할 수 없습니다</ErrorTitle>
      <ErrorDescription>
        요청하신 문제집이 존재하지 않거나
        <br />
        접근 권한이 없을 수 있습니다.
      </ErrorDescription>
      <ButtonGroup>
        <Button variant="secondary" onClick={handleGoBack}>
          이전으로
        </Button>
        <Button variant="primary" onClick={handleGoToDashboard}>
          대시보드로 이동
        </Button>
      </ButtonGroup>
    </NotFoundQuestionSetWrapper>
  );
}

export default NotFoundQuestionSet;
