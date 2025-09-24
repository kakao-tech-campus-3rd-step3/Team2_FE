import styled from '@emotion/styled';
import { Sidebar } from 'lucide-react';
import LogoutButton from '@/features/login/components/LogoutButton';

const PageHeaderWrapper = styled.header`
  width: 100%;
  height: 76px;
  padding: ${({ theme }) => theme.spacing.spacing5};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  background-color: ${({ theme }) => theme.colors.gray.gray1};
  display: flex;
  align-items: center;
  justify-content: space-between;
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

interface User {
  name: string;
}

interface PageHeaderProps {
  isOpen: boolean;
  openSideBar: () => void;
  selectedMenu: string;
  user: User | null;
}

function PageHeader({ isOpen, openSideBar, selectedMenu, user }: PageHeaderProps) {
  return (
    <PageHeaderWrapper>
      <HeaderLeft>
        {!isOpen && <Sidebar size={16} onClick={openSideBar} />}
        <PageTitle>{selectedMenu}</PageTitle>
      </HeaderLeft>
      <div>
        {user ? (
          <>
            <span>{user.name}님, 환영합니다.</span>
            <LogoutButton />
          </>
        ) : (
          <span>로그인 정보 없음</span>
        )}
      </div>
    </PageHeaderWrapper>
  );
}

export default PageHeader;
