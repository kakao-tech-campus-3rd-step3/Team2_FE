import SideBar from '@/shared/components/SideBar/SideBar';
import AppLayout from './layout/AppLayout';
import { PageLayout, PageContent } from './layout/AppLayoutVertical';
import PageHeader from '@/shared/components/PageHeader/PageHeader';

import Dashboard from './HomeSection/Dashboard';
import Source from './HomeSection/Source';
import Create from './HomeSection/Create';
import Quiz from './HomeSection/Quiz';
import Wrong from './HomeSection/Wrong';
import Solve from './HomeSection/Solve';

import { useEffect, useState } from 'react';
import { createEventSource } from '@/shared/utils/sse';

import { toast } from 'react-toastify';

function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(true); // LSB의 열림, 닫힘 state
  const [selectedMenu, setSelectedMenu] = useState<string>('문제집 생성'); // TODO: 현재 state로 어는 페이지에 있는지 저장하고 페이징, 하지만 리액트 라우터 아울렛을 사용하는 방식으로 리펙토링 해야함
  const [questionSetReady, setQuestionSetReady] = useState<boolean>(false); // 문제 생성이 완료되었는지 state, 구조 개선하면 지울수도 있는 state, questionSetReady 쓸때 구조분해할당에 추가
  const [questionSetId, setQuestionSetId] = useState<number>(5); // 문제 조회할때 보낼 state, questionSetId 쓸때 구조분해할당에 추가

  // sse 연결
  useEffect(() => {
    // sse 연결 부분
    console.log('Home.tsx useEffect 진입');
    const es = createEventSource({
      onOpen: () => {
        console.log('SSE Open');
      },
      onHandShake: () => {
        console.log('SSE HandShake후 SSE 구독'); // 이 log가 뜨면 서버와 sse 연결이 된것
      },
      onQuestionSetCreationComplete: (payload) => {
        // payload.success로 문제가 다 생성된것을 감지
        // payload.questionSetId로 문제 조회할때 사용
        // payload.message로 토스트 메시지 띄울때 사용

        if (payload.success) {
          console.log('문제집 생성 완료');
          setQuestionSetReady(true);
          setQuestionSetId(payload.questionSetId);
          toast(payload.message, {
            onClick: () => {
              setSelectedMenu('문제풀이');
            },
          }); // message 내용으로 토스트 메시지를 띄움
        } else {
          console.log('문제집 생성 실패');
        }
      },
    });

    // TODO: 추후 로그아웃시 sse 연결 해제로 구현
    return () => {
      es?.close?.();
    };
  }, []);

  const renderContent = () => {
    switch (selectedMenu) {
      case '대시보드':
        return <Dashboard />;
      case '학습소스 관리':
        return <Source />;
      case '문제집 생성':
        return <Create setSelectedMenu={setSelectedMenu} questionSetReady={questionSetReady} />;
      case '문제풀이':
        return <Solve setSelectedMenu={setSelectedMenu} questionSetId={questionSetId} />;
      case '나의 문제집':
        return <Quiz />;
      case '오답노트':
        return <Wrong />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout>
      {/* 사이드바 */}
      <SideBar
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <PageLayout>
        {/* 페이지 헤더 */}
        <PageHeader selectedMenu={selectedMenu} isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* 페이지 컨텐츠 */}
        <PageContent>{renderContent()}</PageContent>
      </PageLayout>
    </AppLayout>
  );
}

export default Home;
