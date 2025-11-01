// 필수 라이브러리
import styled from '@emotion/styled';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  // SSE 연결 설정
  useEffect(() => {
    const token = getToken();
    if (!token) {
      // 토큰이 없으면 SSE 연결을 시도하지 않음
      return;
    }

    const es = new NotificationSse();
    esRef.current = es;

    es.onOpen(() => {
      console.log('[SSE] 연결 성공 (Open)');
    });
    es.onHandShake(() => {
      console.log('[SSE] HandShake 완료');
    });
    es.onError((e) => {
      console.error('[SSE] 에러 발생:', e);
    });

    es.onQuestionCreationComplete((payload) => {
      console.log('[SSE] 문제집 생성 완료');
      if (payload.success) {
        setQuestionSetReady(true); // 문제집 생성 완료 상태 변경
        setQuestionSetId(payload.questionSetId); // 만들어진 문제집 id 상태 변경
        toast(payload.message, {
          onClick: () => {
            handleNavigate(`/solve/${payload.questionSetId}`);
          },
        });
      } else {
        console.log('[SSE] 문제집 생성 실패');
      }
    });

    // 컴포넌트 언마운트 시 SSE 연결 정리
    return () => {
      es.close();
    };
  }, [handleNavigate]); // navigate는 안정적인 참조이므로 의존성에 포함해도 재실행되지 않음

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
