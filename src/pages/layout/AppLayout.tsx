import styled from '@emotion/styled';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { NotificationSse } from '@/shared/utils/sse';
import { toast } from 'react-toastify';
import SideBar from '@/shared/components/SideBar/SideBar';
import PageHeader from '@/shared/components/PageHeader/PageHeader';
import { MIN_HEIGHT } from '@/shared/config/constants';
import { getToken } from '@/shared/utils/tokenManager';

const AppLayoutWrapper = styled.div`
  width: 100%;
  height: 100dvh;
  min-height: ${MIN_HEIGHT};
  display: flex;
  overflow: auto;
`;

const AppLayoutVertical = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: ${MIN_HEIGHT};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  flex: 1;
`;

const Main = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
  flex: 1;
`;

function AppLayout() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<string>('대시보드'); // 현재 페이지 저장 state
  const [questionSetReady, setQuestionSetReady] = useState<boolean>(false); // 문제 생성이 완료되었는지 state
  const [questionSetId, setQuestionSetId] = useState<number>(0); // 문제 조회할때 보낼 state

  // SSE 연결 인스턴스를 ref로 관리 (리렌더링 시 재생성 방지)
  const esRef = useRef<NotificationSse | null>(null);

  // wrapper 함수들
  const openSideBar = () => setIsOpen(true); // LSB 여는 함수
  const closeSideBar = () => setIsOpen(false); // LSB 닫는 함수
  const changeMenu = (menu: string) => {
    setSelectedMenu(menu); // 현재 페이지 text를 바꾸는 함수
  };
  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  // SSE 연결 설정 (토큰이 있을 때만, 마운트 시 한 번만 실행)
  useEffect(() => {
    // 토큰이 없으면 SSE 연결을 시도하지 않음
    const token = getToken();
    if (!token) {
      console.log('[SSE] 토큰이 없어 SSE 연결을 건너뜁니다.');
      return;
    }

    console.log('[SSE] 연결 시작...');
    const es = new NotificationSse();
    esRef.current = es;

    es.onOpen(() => console.log('[SSE] 연결 성공 (Open)'));
    es.onHandShake(() => console.log('[SSE] HandShake 완료'));
    es.onError((e) => {
      console.error('[SSE] 에러 발생:', e);
      // EventSource는 자동으로 재연결을 시도합니다 (기본 동작)
    });

    es.onQuestionCreationComplete((payload) => {
      if (payload.success) {
        console.log('[SSE] 문제집 생성 완료:', payload.questionSetId);
        setQuestionSetReady(true);
        setQuestionSetId(payload.questionSetId);
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
    // return () => {
    //   console.log("컼포넌트 언마운트 되엇음");
    //   console.log('[SSE] 연결 종료 (cleanup)');
    //   es.close();
    // };
  }, [handleNavigate]); // navigate는 안정적인 참조이므로 의존성에 포함해도 재실행되지 않음

  const esClose = () => {
    if (esRef.current) {
      esRef.current.close();
    }
  };

  return (
    <AppLayoutWrapper>
      <SideBar
        isOpen={isOpen}
        closeSideBar={closeSideBar}
        selectedMenu={selectedMenu}
        changeMenu={changeMenu}
        esClose={esClose}
      />
      <AppLayoutVertical>
        <PageHeader isOpen={isOpen} openSideBar={openSideBar} selectedMenu={selectedMenu} />
        <Main>
          <Outlet
            context={{ questionSetId, questionSetReady, setQuestionSetId, setQuestionSetReady }}
          />
        </Main>
      </AppLayoutVertical>
    </AppLayoutWrapper>
  );
}

// test
export default AppLayout;
