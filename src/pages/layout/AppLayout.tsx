// External libraries
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

// Shared components & hooks
import SideBar from '@/shared/components/SideBar/SideBar';
import PageHeader from '@/shared/components/PageHeader/PageHeader';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { useSSEConnection } from '@/shared/hooks/useSSEConnection';

const AppLayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 1050px;
  display: flex;
  overflow: hidden;

  @media (max-width: 1050px), (max-height: 400px) {
    min-width: 100%;
    height: 100vh;
    flex-direction: column;
    overflow-x: hidden;
  }
`;

const AppLayoutVertical = styled.div<{ isOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  overflow-x: auto;

  /* 사이드바를 위한 왼쪽 마진 */
  margin-left: ${({ isOpen }) => (isOpen ? '240px' : '0')};
  transition: margin-left 0.4s ease;

  @media (max-width: 1050px), (max-height: 400px) {
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 64px;
    min-height: calc(100vh - 64px);
    overflow-x: hidden;
    width: 100%;
  }
`;

const Main = styled.div`
  width: 100%;
  min-width: 800px;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
  flex: 1;
  height: calc(100% - 76px);

  @media (max-width: 1050px), (max-height: 400px) {
    min-width: unset;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
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
