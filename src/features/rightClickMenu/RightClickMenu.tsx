import styled from '@emotion/styled';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const ContextMenuContainer = styled.div<{ x: number; y: number; width?: number; height?: number }>`
  position: fixed;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  background-color: white;
  border-radius: 8px;
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.1);
  min-width: fit-content;
  max-width: 300px;
  width: auto;
  ${({ height }) => height && `height: ${height}px;`}
  ${({ height }) => height && `max-height: ${height}px;`}
  z-index: 9999;
  overflow: hidden;
  animation: contextMenuFadeIn 0.15s ease-out;

  @keyframes contextMenuFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ContextMenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 4px 0;
`;

const ContextMenuItem = styled.li<{ disabled?: boolean }>`
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

const ContextMenuDivider = styled.li`
  height: 1px;
  background-color: #e0e0e0;
  margin: 4px 0;
  padding: 0;
  cursor: default;
`;

const MenuIcon = styled.span`
  font-size: 16px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface MenuContent {
  type: 'content';
  key: string;
  title: string;
  onClick: MenuContentOnClickCallback;
  disabled?: boolean;
  icon?: string;
}

interface MenuDivider {
  type: 'divider';
  key: string;
}

export type MenuItem = MenuContent | MenuDivider;

const isMenuContent = (item: MenuItem): item is MenuContent => item.type === 'content';
const isMenuDivider = (item: MenuItem): item is MenuDivider => item.type === 'divider';

type MenuContentOnClickCallback = () => void;

function RightClickMenu({
  isVisible,
  setIsVisible,
  point,
  menuContents,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  point: { x: number; y: number };
  menuContents: MenuItem[];
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState({ x: point.x, y: point.y });

  // 메뉴 위치를 동적으로 조정
  useLayoutEffect(() => {
    if (isVisible && menuRef.current) {
      const menuWidth = menuRef.current.offsetWidth;
      const menuHeight = menuRef.current.offsetHeight;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x = point.x;
      let y = point.y;

      if (x + menuWidth > viewportWidth) {
        x = point.x - menuWidth - 2;
      }

      if (y + menuHeight > viewportHeight) {
        y = viewportHeight - menuHeight - 10;
      }

      if (y < 0) {
        y = 10;
      }

      if (x < 0) {
        x = 10;
      }

      setAdjustedPosition({ x, y });
    }
  }, [isVisible, point.x, point.y]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('contextmenu', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('contextmenu', handleClickOutside);
      };
    }
  }, [isVisible, setIsVisible]);

  const handleMenuItemClick = useCallback(
    (callback: MenuContentOnClickCallback) => {
      callback();
      setIsVisible(false);
    },
    [setIsVisible],
  );

  const MenuItemComponent = (item: MenuItem) => {
    if (isMenuContent(item)) {
      return (
        <ContextMenuItem
          onClick={item.disabled ? undefined : () => handleMenuItemClick(item.onClick)}
          key={item.key}
          disabled={item.disabled}
        >
          <MenuIcon>{item.icon}</MenuIcon>
          {item.title}
        </ContextMenuItem>
      );
    }
    if (isMenuDivider(item)) {
      return <ContextMenuDivider key={item.key} />;
    }
  };

  if (!isVisible) return null;
  return (
    <ContextMenuContainer ref={menuRef} x={adjustedPosition.x} y={adjustedPosition.y}>
      <ContextMenuList>{menuContents.map((v) => MenuItemComponent(v))}</ContextMenuList>
    </ContextMenuContainer>
  );
}

export default RightClickMenu;
