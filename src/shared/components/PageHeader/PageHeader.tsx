import styled from '@emotion/styled';
import { Sidebar } from 'lucide-react';

const PageHeaderWrapper = styled.header`
  width: 100%;
  height: ${(props) => props.theme.space.spacing18};
  padding: ${(props) => props.theme.space.spacing5};
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebarBorder};
  background-color: #fafafa;
  display: flex;
  align-items: center;
`;

const PageTitle = styled.h1`
  color: ${(props) => props.theme.colors.sidebarForeground};
  font-size: ${(props) => props.theme.textStyles.title2Bold.fontSize};
  margin-left: 12px;
`;

interface PageHeaderProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
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
