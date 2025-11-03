// 필수 라이브러리
import styled from '@emotion/styled';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// UI 컴포넌트
import SideBar from '@/shared/components/SideBar/SideBar';
import PageHeader from '@/shared/components/PageHeader/PageHeader';
// SSE Hook
import { useSSEConnection } from '@/shared/hooks/useSSEConnection';
// 에러 바운더리
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
// 상수 값
import { MIN_HEIGHT } from '@/shared/config/constants';

const AppLayoutWrapper = styled.div`
  width: 100%;
  height: 100dvh;
  min-height: ${MIN_HEIGHT};
  min-width: 1050px;
  display: flex;
  overflow: hidden;
`;

const AppLayoutVertical = styled.div<{ isOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: ${MIN_HEIGHT};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  overflow-x: auto;

  /* 사이드바를 위한 왼쪽 마진 */
  margin-left: ${({ isOpen }) => (isOpen ? '240px' : '0')};
  transition: margin-left 0.4s ease;
`;

const Main = styled.div`
  width: 100%;
  min-width: 800px;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
  flex: 1;
  height: calc(100% - 76px);
`;

function AppLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(true); // LSB 열림, 닫힘 상태
  const location = useLocation();

  // SSE 연결 관리
  const {
    questionSetReady,
    questionSetId,
    setQuestionSetReady,
    setQuestionSetId,
    closeConnection,
  } = useSSEConnection();

  // wrapper 함수들
  const openSideBar = () => setIsOpen(true); // LSB 여는 함수
  const closeSideBar = () => setIsOpen(false); // LSB 닫는 함수

  return (
    <AppLayoutWrapper>
      <SideBar isOpen={isOpen} closeSideBar={closeSideBar} esClose={closeConnection} />
      <AppLayoutVertical isOpen={isOpen}>
        <PageHeader isOpen={isOpen} openSideBar={openSideBar} />
        <Main>
          <ErrorBoundary key={location.pathname}>
            <Outlet
              context={{ questionSetId, questionSetReady, setQuestionSetId, setQuestionSetReady }}
            />
          </ErrorBoundary>
        </Main>
      </AppLayoutVertical>
    </AppLayoutWrapper>
  );
}

// test
export default AppLayout;
