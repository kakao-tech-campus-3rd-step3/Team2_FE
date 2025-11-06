import styled from '@emotion/styled';
import { Sidebar } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';

const PageHeaderWrapper = styled.header`
  width: 100%;
  height: 76px;
  padding: ${({ theme }) => theme.spacing.spacing5};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  background-color: ${({ theme }) => theme.colors.gray.gray1};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1050px), (max-height: 400px) {
    display: none;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.gray.gray10};

  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title2Bold.lineHeight};
  margin-left: ${({ theme }) => theme.spacing.spacing3};
`;

interface PageHeaderProps {
  isOpen: boolean;
  openSideBar: () => void;
}

function PageHeader({ isOpen, openSideBar }: PageHeaderProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const path = location.pathname;
  const isReviewing = searchParams.get('isReviewing') === 'true';

  let title = '페이지';

  if (path.startsWith('/dashboard')) title = '대시보드';
  else if (path.startsWith('/create')) title = '문제집 생성';
  else if (path.startsWith('/solve')) {
    title = isReviewing ? '오답노트 풀이' : '문제 풀이';
  } else if (path.startsWith('/library')) title = '나의 문제집';
  else if (path.startsWith('/wrong')) title = '오답노트';
  else if (path.startsWith('/settings')) title = '설정';
  else if (path === '/') title = '문제집 생성';

  return (
    <PageHeaderWrapper>
      <HeaderLeft>
        {!isOpen && <Sidebar size={16} onClick={openSideBar} />}
        <PageTitle>{title}</PageTitle>
      </HeaderLeft>
    </PageHeaderWrapper>
  );
}

export default PageHeader;
