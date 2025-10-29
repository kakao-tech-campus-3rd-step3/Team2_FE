import React from 'react';

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // 에러가 발생하면 상태를 업데이트하여 fallback UI를 렌더링하게 함
    return { hasError: true, error };
  }

  /*
  comopnentDidCatch(error: Error, info: React.ErrorInfo) {
    // 에러 로깅, Sentry 연동 등 가능
     console.error("Error caught by ErrorBoundary:", error, info);
  }
  */

  render() {
    if (this.state.hasError) {
      // fallback이 있으면 그것을 보여주고, 없으면 기본 메시지 표시
      return (
        this.props.fallback ?? (
          <div style={{ padding: '1rem', color: 'red' }}>
            <h2>문제가 발생했습니다 😢</h2>
            <p>{this.state.error?.message}</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
