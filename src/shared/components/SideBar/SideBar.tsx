import BrainIconWithBadge from '@/shared/assets/IconBadge';
import { MIN_HEIGHT } from '@/shared/constants';
import styled from '@emotion/styled';

import {
  FileText,
  Sidebar,
  Settings,
  LayoutDashboard,
  Plus,
  BookOpen,
  CircleX,
} from 'lucide-react';

// 사이드바
const SideBarWrapper = styled.nav<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? props.theme.space.spacing60 : '0px')};
  height: 100dvh;
  min-height: ${MIN_HEIGHT};
  border-right: 1px solid ${(props) => props.theme.colors.sidebarBorder};
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebarBorder};
  display: flex;
  flex-direction: column;

  transition: width 0.3s ease-in-out;
  overflow: hidden;
`;

// 사이드바 헤더
const SideBarHeader = styled.header`
  width: 100%;
  height: 76px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebarBorder};
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
  margin-left: 3px;
`;

const SideBarMainTitle = styled.h1`
  font-size: 15px;
  font-weight: bold;
`;

const SideBarDescription = styled.p`
  font-size: 10px;
  color: gray;
`;

// 사이드바 메인
const SideBarMain = styled.div`
  width: 100%;
  flex: 1;
  padding: ${(props) => props.theme.space.spacing5};
`;

const SideBarNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

// props의 타입을 정의하는 인터페이스
interface NavItemProps {
  active: boolean;
}

const SideBarNavItem = styled.div<NavItemProps>`
  display: flex;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.radius2};

  margin-bottom: ${(props) => props.theme.space.spacing2};
  padding: ${(props) => props.theme.space.spacing1};

  background-color: ${(props) => props.active && props.theme.colors.sidebarAccent};

  &:hover {
    background-color: ${(props) => props.theme.colors.sidebarHover};
  }
`;

const SideBarNavTxt = styled.p`
  font-size: ${(props) => props.theme.textStyles.label1Bold.fontSize};
  margin-left: ${(props) => props.theme.space.spacing2};
`;

// 사이드바 유저 정보
const SideBarUserInfo = styled.div`
  width: 100%;
  height: 76px;
  padding: 15px;
  border-top: 1px solid ${(props) => props.theme.colors.sidebarBorder};
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebarBorder};
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
  background-color: ${(props) => props.theme.colors.sidebarAccent};
  font-size: ${(props) => props.theme.textStyles.label2Regular.fontSize};
  border-radius: ${(props) => props.theme.radius.radiusFull};
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideBarUserInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const SideBarUserInfoName = styled.p`
  font-size: 13px;
  font-weight: bold;
`;

const SideBarUserInfoEmail = styled.p`
  font-size: 9px;
  color: gray;
`;

const menus = ['대시보드', '학습소스 관리', '문제집 생성', '나의 문제집', '오답노트'];

interface SideBarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideBar({ selectedMenu, setSelectedMenu, isOpen, setIsOpen }: SideBarProps) {
  return (
    <SideBarWrapper isOpen={isOpen}>
      {/* 사이드바 헤더 부분 */}
      <SideBarHeader>
        <SideBarHeaderItemWrapper>
          <IconTitleWrapper>
            <BrainIconWithBadge size="43px" borderRadius="0.4rem" />
            <ItemTitleWrapper>
              <SideBarMainTitle>PULL IT</SideBarMainTitle>
              <SideBarDescription>AI Learning Platform</SideBarDescription>
            </ItemTitleWrapper>
          </IconTitleWrapper>
          {/* 성현: 이 부분 아이콘 가져다쓰는거랑 컴포넌트 이름이 같네? 먼 문제생길수도?? */}
          <Sidebar size={16} onClick={() => setIsOpen(false)} />
        </SideBarHeaderItemWrapper>
      </SideBarHeader>

      {/* 사이드바 메인 부분 */}
      <SideBarMain>
        <SideBarNav>
          <SideBarNavItem
            onClick={() => setSelectedMenu(menus[0])}
            active={menus[0] === selectedMenu}
          >
            <LayoutDashboard size={14} />
            <SideBarNavTxt>대시보드</SideBarNavTxt>
          </SideBarNavItem>
          <SideBarNavItem
            onClick={() => setSelectedMenu(menus[1])}
            active={menus[1] === selectedMenu}
          >
            <FileText size={14} />
            <SideBarNavTxt>학습소스 관리</SideBarNavTxt>
          </SideBarNavItem>
          <SideBarNavItem
            onClick={() => setSelectedMenu(menus[2])}
            active={menus[2] === selectedMenu}
          >
            <Plus size={14} />
            <SideBarNavTxt>문제집 생성</SideBarNavTxt>
          </SideBarNavItem>
          <SideBarNavItem
            onClick={() => setSelectedMenu(menus[3])}
            active={menus[3] === selectedMenu}
          >
            <BookOpen size={14} />
            <SideBarNavTxt>나의 문제집</SideBarNavTxt>
          </SideBarNavItem>
          <SideBarNavItem
            onClick={() => setSelectedMenu(menus[4])}
            active={menus[4] === selectedMenu}
          >
            <CircleX size={14} />
            <SideBarNavTxt>오답노트</SideBarNavTxt>
          </SideBarNavItem>
        </SideBarNav>
      </SideBarMain>

      {/* 사이드바 유저 정보 부분 */}
      <SideBarUserInfo>
        <SideBarUserInfoItemWrapper>
          <SideBarUserInfoAvatarTextWrapper>
            <SideBarUserInfoAvatar>김학</SideBarUserInfoAvatar>
            <SideBarUserInfoTextWrapper>
              <SideBarUserInfoName>김학습</SideBarUserInfoName>
              <SideBarUserInfoEmail>user@kakao.com</SideBarUserInfoEmail>
            </SideBarUserInfoTextWrapper>
          </SideBarUserInfoAvatarTextWrapper>
          <Settings size={16} />
        </SideBarUserInfoItemWrapper>
      </SideBarUserInfo>
    </SideBarWrapper>
  );
}

export default SideBar;
