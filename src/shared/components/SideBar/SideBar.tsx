// 필수 라이브러리
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Sidebar, LayoutDashboard, Plus, BookOpen, CircleX, Settings, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
// 유저 정보
import { useAuth } from '@/app/auth/useAuth';
import { clearToken } from '@/shared/utils/tokenManager';
import { administratorApi } from '@/shared/api/axiosClient';
// 에셋
import BrainIconWithBadge from '@/shared/assets/IconBadge';
// 상수
import { MIN_HEIGHT } from '@/shared/config/constants';
import { MENUS } from '@/shared/config/constants';
import { ROUTES } from '@/app/routePaths';

// 사이드바
const SideBarWrapper = styled.nav<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 240px;
  height: 100dvh;
  min-height: ${MIN_HEIGHT};

  border-right: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  display: flex;
  flex-direction: column;

  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  z-index: 100;
  transition: transform 0.4s ease;

  @media (max-width: 1050px) {
    width: 100%;
    height: 60px;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
    flex-direction: row;
    transform: translateY(0); /* 항상 보이도록 */
    position: fixed;
    background-color: white;
  }
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

  @media (max-width: 1050px) {
    width: auto;
    height: 100%;
    border-bottom: none;
    border-right: 1px solid ${({ theme }) => theme.colors.gray.gray4};
    padding: ${({ theme }) => theme.spacing.spacing3};
  }
`;

const SideBarHeaderItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1050px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.spacing1};
  }
`;

const IconTitleWrapper = styled.div`
  display: flex;

  @media (max-width: 1050px) {
    align-items: center;
  }
`;

const ItemTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.spacing1};

  @media (max-width: 1050px) {
    display: none; /* 모바일에서 텍스트 숨김 */
  }
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

const ToggleButton = styled.div`
  cursor: pointer;

  @media (max-width: 1050px) {
    display: none; /* 모바일에서 접기 버튼 숨김 */
  }
`;

// 사이드바 메인
const SideBarMain = styled.div`
  width: 100%;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing5};

  @media (max-width: 1050px) {
    width: auto;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.spacing2};
    border-right: 1px solid ${({ theme }) => theme.colors.gray.gray4};
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

const SideBarNav = styled.nav`
  display: flex;
  flex-direction: column;

  @media (max-width: 1050px) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.spacing1};
    width: 100%;
    justify-content: space-around;
  }
`;

const SideBarNavItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.radius2};

  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
  padding: ${({ theme }) => theme.spacing.spacing1};

  background-color: 'transparent';

  background-color: ${({ active, theme }) => (active ? theme.colors.gray.gray3 : 'transparent')};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.colors.gray.gray3 : theme.colors.gray.gray1};
  }

  @media (max-width: 1050px) {
    margin-bottom: 0;
    padding: ${({ theme }) => theme.spacing.spacing2};
    flex-direction: column;
    gap: 2px;
  }
`;

const SideBarNavTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};

  margin-left: ${({ theme }) => theme.spacing.spacing2};

  @media (max-width: 1050px) {
    margin-left: 0;
    font-size: 10px;
    text-align: center;
  }
`;

// 사이드바 유저 정보
const SideBarUserInfo = styled.div`
  width: 100%;
  height: 76px;
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  display: flex;

  @media (max-width: 1050px) {
    width: auto;
    height: 100%;
    border-top: none;
    border-left: 1px solid ${({ theme }) => theme.colors.gray.gray4};
    border-bottom: none;
    padding: ${({ theme }) => theme.spacing.spacing4} ${({ theme }) => theme.spacing.spacing5};
  }
`;

const SideBarUserInfoItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1050px) {
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.spacing2};
  }
`;

const SideBarUserInfoAvatarTextWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1050px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.spacing2};
  }
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
  width: 145px;

  @media (max-width: 1050px) {
    display: none;
    margin-left: 0;
    width: auto;
  }
`;

const SideBarUserInfoName = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Bold.lineHeight};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SideBarUserInfoEmail = styled.p`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  z-index: 1000;

  @media (max-width: 1050px) {
    bottom: auto;
    top: 100%;
    margin-bottom: 0;
    margin-top: 8px;
    right: 0;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.gray.gray1};
  }

  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 8px 8px;
  }

  &.danger {
    color: ${({ theme }) => theme.colors.red.red4};
  }
`;

const DropdownItemTxt = styled.span``;

const SettingsIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1050px) {
    /* 모바일에서도 표시 */
  }
`;

interface SideBarProps {
  isOpen: boolean;
  closeSideBar: () => void;
  esClose: () => void;
}

function SideBar({ isOpen, closeSideBar, esClose }: SideBarProps) {
  const [open, setOpen] = useState(false); // 설정 드롭다운 열림, 닫힘 상태
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useAuth(); // 유저 정보 불러오기

  const handleLogout = async () => {
    try {
      await administratorApi.post('/auth/logout');

      esClose();
      clearToken(); // 클로저에서 토큰 제거

      window.location.href = '/login';
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const path = location.pathname;
  let selectedMenu = '페이지';

  if (path === ROUTES.CREATE) {
    selectedMenu = MENUS.CREATE;
  } else if (path.startsWith(ROUTES.DASHBOARD)) {
    selectedMenu = MENUS.DASHBOARD;
  } else if (path.startsWith(ROUTES.LIBRARY)) {
    selectedMenu = MENUS.LIBRARY;
  } else if (path.startsWith(ROUTES.WRONG)) {
    selectedMenu = MENUS.WRONG;
  }

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
          <ToggleButton>
            <Sidebar size={16} onClick={closeSideBar} />
          </ToggleButton>
        </SideBarHeaderItemWrapper>
      </SideBarHeader>

      {/* 사이드바 메인 부분 */}
      <SideBarMain>
        <SideBarNav>
          <NavLink to={ROUTES.DASHBOARD}>
            <SideBarNavItem active={MENUS.DASHBOARD === selectedMenu}>
              <LayoutDashboard size={14} />
              <SideBarNavTxt>{MENUS.DASHBOARD}</SideBarNavTxt>
            </SideBarNavItem>
          </NavLink>
          <NavLink to={ROUTES.CREATE}>
            <SideBarNavItem active={MENUS.CREATE === selectedMenu}>
              <Plus size={14} />
              <SideBarNavTxt>{MENUS.CREATE}</SideBarNavTxt>
            </SideBarNavItem>
          </NavLink>

          <NavLink to={ROUTES.LIBRARY}>
            <SideBarNavItem active={MENUS.LIBRARY === selectedMenu}>
              <BookOpen size={14} />
              <SideBarNavTxt>{MENUS.LIBRARY}</SideBarNavTxt>
            </SideBarNavItem>
          </NavLink>

          <NavLink to={ROUTES.WRONG}>
            <SideBarNavItem active={MENUS.WRONG === selectedMenu}>
              <CircleX size={14} />
              <SideBarNavTxt>{MENUS.WRONG}</SideBarNavTxt>
            </SideBarNavItem>
          </NavLink>
        </SideBarNav>
      </SideBarMain>

      {/* 사이드바 유저 정보 부분 */}
      <SideBarUserInfo>
        <SideBarUserInfoItemWrapper style={{ position: 'relative' }}>
          <SideBarUserInfoAvatarTextWrapper>
            <SideBarUserInfoAvatar>
              {userInfo?.name ? userInfo.name.charAt(0) : '?'}
            </SideBarUserInfoAvatar>
            <SideBarUserInfoTextWrapper>
              <SideBarUserInfoName>{userInfo?.name || '로그인 필요'}</SideBarUserInfoName>
              <SideBarUserInfoEmail>{userInfo?.email || '로그인 필요'}</SideBarUserInfoEmail>
            </SideBarUserInfoTextWrapper>
            <SettingsIconWrapper>
              <Settings size={16} onClick={() => setOpen((prev) => !prev)} />
            </SettingsIconWrapper>
          </SideBarUserInfoAvatarTextWrapper>

          {open && (
            <DropdownWrapper>
              <DropdownItem onClick={() => navigate('/settings')}>
                <Settings size={16} />
                <DropdownItemTxt>설정</DropdownItemTxt>
              </DropdownItem>
              <DropdownItem className="danger" onClick={handleLogout}>
                <LogOut size={16} />
                <DropdownItemTxt>로그아웃</DropdownItemTxt>
              </DropdownItem>
            </DropdownWrapper>
          )}
        </SideBarUserInfoItemWrapper>
      </SideBarUserInfo>
    </SideBarWrapper>
  );
}

export default SideBar;
