import styled from '@emotion/styled';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { NotificationSse } from '@/shared/utils/sse';
import { toast } from 'react-toastify';
import SideBar from '@/shared/components/SideBar/SideBar';
import PageHeader from '@/shared/components/PageHeader/PageHeader';
import { MIN_HEIGHT } from '@/shared/config/constants';

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

  // wrapper 함수들
  const openSideBar = () => setIsOpen(true); // LSB 여는 함수
  const closeSideBar = () => setIsOpen(false); // LSB 닫는 함수
  const changeMenu = (menu: string) => {
    setSelectedMenu(menu); // 현재 페이지 text를 바꾸는 함수
  };

  // TODO: sse 연결 이 부분 나중에 분리하자
  const es = new NotificationSse();

  es.onOpen(() => console.log('SSE Open'));
  es.onHandShake(() => console.log('SSE HandShake'));
  es.onError((e) => console.log(`ERROR: ${JSON.stringify(e.target)}`));
  es.onQuestionCreationComplete((payload) => {
    if (payload.success) {
      console.log('문제집 생성 완료');
      setQuestionSetReady(true);
      setQuestionSetId(payload.questionSetId);
      toast(payload.message, {
        onClick: () => {
          navigate(`/solve/${payload.questionSetId}`);
        },
      });
    } else {
      console.log('문제집 생성 실패');
    }
  });

  const esClose = () => es.close();

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
