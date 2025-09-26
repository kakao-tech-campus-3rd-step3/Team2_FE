import BrainIconWithBadge from '@/shared/assets/IconBadge';
import { MIN_HEIGHT } from '@/shared/config/constants';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/app/routePaths';
import { useAuth } from '@/app/auth/useAuth';
import LogoutButton from '@/features/login/components/LogoutButton';

import { FileText, Sidebar, LayoutDashboard, Plus, BookOpen, CircleX } from 'lucide-react';

import { MENUS } from '@/shared/config/constants';

// 사이드바
const SideBarWrapper = styled.nav<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? '240px' : '0px')};
  height: 100dvh;
  min-height: ${MIN_HEIGHT};

  border-right: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  display: flex;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  flex-direction: column;

  overflow: hidden;
  transition: width 0.3s ease-in-out;
`;

// 사이드바 헤더
const SideBarHeader = styled.header`
  width: 100%;
  height: 76px;
  padding: ${({ theme }) => theme.spacing.spacing4};

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
`;

const SideBarHeaderItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconTitleWrapper = styled.div`
  display: flex;
`;

const ItemTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.spacing1};
`;

const SideBarMainTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title2Bold.lineHeight};
`;

const SideBarDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

// 사이드바 메인
const SideBarMain = styled.div`
  width: 100%;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing5};
`;

const SideBarNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const SideBarNavItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.radius2};

  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
  padding: ${({ theme }) => theme.spacing.spacing1};

  background-color: 'transparent';

  &.active {
    background: ${({ theme }) => theme.colors.gray.gray3};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.gray1};
  }
`;

const SideBarNavTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};

  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;

// 사이드바 유저 정보
const SideBarUserInfo = styled.div`
  width: 100%;
  height: 76px;
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  display: flex;
`;

const SideBarUserInfoItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SideBarUserInfoAvatarTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SideBarUserInfoAvatar = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray4};
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

  border-radius: ${({ theme }) => theme.radius.radiusFull};
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideBarUserInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;

const SideBarUserInfoName = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Bold.lineHeight};
`;

interface SideBarProps {
  isOpen: boolean;
  closeSideBar: () => void;
  selectedMenu: string;
  changeMenu: (menu: string) => void;
}

function SideBar({ isOpen, closeSideBar, selectedMenu, changeMenu }: SideBarProps) {
  const { userInfo } = useAuth();

  return (
    <SideBarWrapper isOpen={isOpen}>
      {/* 사이드바 헤더 부분 */}
      <SideBarHeader>
        <SideBarHeaderItemWrapper>
          <IconTitleWrapper>
            <BrainIconWithBadge size="47px" borderRadius="0.4rem" />
            <ItemTitleWrapper>
              <SideBarMainTitle>PULL IT</SideBarMainTitle>
              <SideBarDescription>AI 학습 도구</SideBarDescription>
            </ItemTitleWrapper>
          </IconTitleWrapper>
          {/* TODO: 이 부분 페이지 컴포넌트랑 이름이 같네? 문제가 생길수도? */}
          <Sidebar size={16} onClick={closeSideBar} />
        </SideBarHeaderItemWrapper>
      </SideBarHeader>

      {/* 사이드바 메인 부분 */}
      <SideBarMain>
        <SideBarNav>
          <NavLink to={ROUTES.DASHBOARD}>
            <SideBarNavItem
              active={MENUS.DASHBOARD === selectedMenu}
              onClick={() => changeMenu(MENUS.DASHBOARD)}
            >
              <LayoutDashboard size={14} />
              <SideBarNavTxt>{MENUS.DASHBOARD}</SideBarNavTxt>
            </SideBarNavItem>
          </NavLink>

          <NavLink to={ROUTES.SOURCE}>
            <SideBarNavItem
              active={MENUS.SOURCE === selectedMenu}
              onClick={() => changeMenu(MENUS.SOURCE)}
            >
              <FileText size={14} />
              <SideBarNavTxt>{MENUS.SOURCE}</SideBarNavTxt>
            </SideBarNavItem>
          </NavLink>

          <NavLink to={ROUTES.CREATE}>
            <SideBarNavItem
              active={MENUS.CREATE === selectedMenu}
              onClick={() => changeMenu(MENUS.CREATE)}
            >
              <Plus size={14} />
              <SideBarNavTxt>{MENUS.CREATE}</SideBarNavTxt>
            </SideBarNavItem>
          </NavLink>

          <NavLink to={ROUTES.LIBRARY}>
            <SideBarNavItem
              active={MENUS.LIBRARY === selectedMenu}
              onClick={() => changeMenu(MENUS.LIBRARY)}
            >
              <BookOpen size={14} />
              <SideBarNavTxt>{MENUS.LIBRARY}</SideBarNavTxt>
            </SideBarNavItem>
          </NavLink>

          <NavLink to={ROUTES.WRONG}>
            <SideBarNavItem
              active={MENUS.WRONG === selectedMenu}
              onClick={() => changeMenu(MENUS.LIBRARY)}
            >
              <CircleX size={14} />
              <SideBarNavTxt>{MENUS.WRONG}</SideBarNavTxt>
            </SideBarNavItem>
          </NavLink>
        </SideBarNav>
      </SideBarMain>

      {/* 사이드바 유저 정보 부분 */}
      <SideBarUserInfo>
        <SideBarUserInfoItemWrapper>
          <SideBarUserInfoAvatarTextWrapper>
            <SideBarUserInfoAvatar>
              {userInfo?.name ? userInfo.name.charAt(0) : '?'}
            </SideBarUserInfoAvatar>
            <SideBarUserInfoTextWrapper>
              <SideBarUserInfoName>{userInfo?.name || '로그인 필요'}</SideBarUserInfoName>
            </SideBarUserInfoTextWrapper>
          </SideBarUserInfoAvatarTextWrapper>
          <LogoutButton />
        </SideBarUserInfoItemWrapper>
      </SideBarUserInfo>
    </SideBarWrapper>
  );
}

export default SideBar;
