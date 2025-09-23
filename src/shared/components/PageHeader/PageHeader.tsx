import styled from '@emotion/styled';
import { Sidebar } from 'lucide-react';

const PageHeaderWrapper = styled.header`
  width: 100%;
  height: 76px;
  padding: ${({ theme }) => theme.spacing.spacing5};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  background-color: ${({ theme }) => theme.colors.gray.gray1};
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

// 여기도 props 타입이 일관되지않네....
interface PageHeaderProps {
  selectedMenu: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PageHeader({ selectedMenu, isOpen, setIsOpen }: PageHeaderProps) {
  return (
    <PageHeaderWrapper>
      {!isOpen && <Sidebar size={16} onClick={() => setIsOpen(true)} />}
      <PageTitle>{selectedMenu}</PageTitle>
    </PageHeaderWrapper>
  );
}

export default PageHeader;
