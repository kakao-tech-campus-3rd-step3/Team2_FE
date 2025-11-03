// 필수 라이브러리
import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// UI 컴포넌트
import SideBar from '@/shared/components/SideBar/SideBar';
import PageHeader from '@/shared/components/PageHeader/PageHeader';
// SSE
import { NotificationSse } from '@/shared/utils/sse';
// 로그인 정보
import { getToken } from '@/shared/utils/tokenManager';
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
  const [questionSetReady, setQuestionSetReady] = useState<boolean>(false); // 문제 생성이 완료되었는지 상태
  const [questionSetId, setQuestionSetId] = useState<number>(0); // 문제풀이에서 문제집을 받아오기 위한 상태
  const location = useLocation();
  const navigate = useNavigate();
  const esRef = useRef<NotificationSse | null>(null); // SSE 연결 인스턴스를 ref로 관리 (리렌더링 시 재생성 방지)

  // wrapper 함수들
  const openSideBar = () => setIsOpen(true); // LSB 여는 함수
  const closeSideBar = () => setIsOpen(false); // LSB 닫는 함수

  // SSE 연결 설정
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    // sse 연결해제 에러 메시지가 event-source-polyfill 라이블러리 단에서 출력하는거라 console.error를 오버라이딩해서 처리해야함
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      const message = args[0]?.toString() || '';
      // SSE 타임아웃 관련 에러는 무시
      if (message.includes('No activity within') || message.includes('[SSE] 에러 발생')) {
        return;
      }
      originalError.apply(console, args);
    };

    const es = new NotificationSse();
    esRef.current = es;

    es.onError((e) => {
      const errorEvent = e as ErrorEvent;
      // 타임아웃으로 인한 자동 재연결은 정상 동작이므로 로그 출력 안 함
      if (errorEvent.message && errorEvent.message.includes('No activity within')) {
        // 재연결은 라이브러리가 자동으로 처리하므로 아무것도 안 함
        return;
      }
      // 실제 에러만 콘솔에 표시 (오버라이드된 console.error 사용)
      originalError('[SSE] 에러 발생:', e);
    });

    es.onQuestionCreationComplete((payload) => {
      console.log('[SSE] 문제집 생성 완료');
      if (payload.success) {
        setQuestionSetReady(true); // 문제집 생성 완료 상태 변경
        setQuestionSetId(payload.questionSetId); // 만들어진 문제집 id 상태 변경
        toast(payload.message, {
          onClick: () => {
            navigate(`/solve/${payload.questionSetId}`);
          },
        });
      } else {
        console.log('[SSE] 문제집 생성 실패');
      }
    });

    // 컴포넌트 언마운트 시 SSE 연결 정리 및 console.error 복원
    return () => {
      es.close();
      console.error = originalError; // console.error 원래대로 복원
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const esClose = () => {
    if (esRef.current) {
      esRef.current.close();
    }
  };

  return (
    <AppLayoutWrapper>
      <SideBar isOpen={isOpen} closeSideBar={closeSideBar} esClose={esClose} />
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
