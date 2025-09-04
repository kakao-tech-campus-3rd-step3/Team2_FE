import SideBar from '@/shared/components/SideBar/SideBar';
import AppLayout from './layout/AppLayout';
import PageLayout from './layout/PageLayout';
import PageHeader from '@/shared/components/PageHeader/PageHeader';

import Dashboard from './HomeSection/Dashboard';
import Source from './HomeSection/Source';
import Create from './HomeSection/Create';
import Quiz from './HomeSection/Quiz';
import Wrong from './HomeSection/Wrong';

import { useState } from 'react';

function Home() {
  const [selectedMenu, setSelectedMenu] = useState('대시보드');
  const [isOpen, setIsOpen] = useState(true);
  const renderContent = () => {
    switch (selectedMenu) {
      case '대시보드':
        return <Dashboard />;
      case '학습소스 관리':
        return <Source />;
      case '문제집 생성':
        return <Create />;
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
      <SideBar
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <PageLayout>
        <PageHeader
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        {renderContent()}
      </PageLayout>
    </AppLayout>
  );
}

export default Home;
