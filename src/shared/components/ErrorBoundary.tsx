import React from 'react';
import styled from '@emotion/styled';
import DotLottiePlayer from '@aarsteinmedia/dotlottie-react';
import errorAnimation from '@/shared/assets/lotties/Error.lottie';
import PullItLogo from '@/shared/components/PullItIntroLogo';

const MAIN_ERROR_MSG = '앗! 예상치 못한 오류가 발생했습니다';
const DEFAULT_SUB_ERROR_MSG = '잠시 후 다시 시도해 주세요';

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  width: 100%;
  flex: 8;
  background-color: #dcfce7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const BottomContainer = styled.div`
  width: 100%;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const LottieWrapper = styled.div`
  width: 20rem;
  margin-bottom: 1.5rem;
`;

const ErrorMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorMsgTitle = styled.h2`
  color: red;
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  padding: 5px;
`;

const ErrorMsgSubtitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray.gray7};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  padding: 5px;
`;

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      const errorMessage =
        this.state.error?.message && this.state.error.message.trim() !== ''
          ? this.state.error.message
          : DEFAULT_SUB_ERROR_MSG;

      return (
        <ErrorContainer>
          <TopContainer>
            <LottieWrapper>
              <DotLottiePlayer
                src={errorAnimation}
                autoplay
                loop
                style={{ width: '100%', height: '100%' }}
              />
            </LottieWrapper>
            <ErrorMessageWrapper>
              {this.props.fallback ?? (
                <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                  <ErrorMsgTitle>{MAIN_ERROR_MSG}</ErrorMsgTitle>
                  <ErrorMsgSubtitle>{errorMessage}</ErrorMsgSubtitle>
                </div>
              )}
            </ErrorMessageWrapper>
          </TopContainer>
          <BottomContainer>
            <PullItLogo />
          </BottomContainer>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
