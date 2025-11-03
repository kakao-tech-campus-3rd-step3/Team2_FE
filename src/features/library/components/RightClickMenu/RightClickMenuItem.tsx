import styled from '@emotion/styled';
import { type LucideIcon } from 'lucide-react';

const StyledMenuItem = styled.li<{ disabled?: boolean }>`
  padding: 8px 16px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${({ disabled }) => (disabled ? '#999' : '#333')};
  transition: background-color 0.1s;
  user-select: none;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  white-space: nowrap;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'transparent' : '#f0f0f0')};
  }

  &:active {
    background-color: ${({ disabled }) => (disabled ? 'transparent' : '#e0e0e0')};
  }
`;

const MenuIcon = styled.span`
  font-size: 16px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
  }
`;

interface RightClickMenuItemProps {
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

function RightClickMenuItem({ onClick, disabled, icon: Icon, children }: RightClickMenuItemProps) {
  return (
    <StyledMenuItem onClick={disabled ? undefined : onClick} disabled={disabled}>
      {Icon && (
        <MenuIcon>
          <Icon />
        </MenuIcon>
      )}
      {children}
    </StyledMenuItem>
  );
}

export default RightClickMenuItem;
