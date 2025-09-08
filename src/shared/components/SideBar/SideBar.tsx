import BrainIconWithBadge from '@/shared/assets/IconBadge';
import { MIN_HEIGHT } from '@/shared/constants';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

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
  width: ${({ isOpen }) => (isOpen ? '240px' : '0px')};
  height: 100dvh;
  min-height: ${MIN_HEIGHT};

  border-right: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  display: flex;
  /* display: ${({ isOpen }) => (isOpen ? 'flex' : 'hidden')}; */
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
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize}; // 15px
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

  background-color: ${({ active, theme }) => (active ? theme.colors.gray.gray3 : 'transparent')};

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

const SideBarUserInfoEmail = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

const menus = ['대시보드', '학습소스 관리', '문제집 생성', '나의 문제집', '오답노트'];

interface SideBarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SideBar({ selectedMenu, setSelectedMenu, isOpen, setIsOpen }: SideBarProps) {
  const navigate = useNavigate();

  return (
    <SideBarWrapper isOpen={isOpen}>
      {/* 사이드바 헤더 부분 */}
      <SideBarHeader>
        <SideBarHeaderItemWrapper>
          <IconTitleWrapper>
            <BrainIconWithBadge size="43px" borderRadius="0.4rem" />
            <ItemTitleWrapper>
              <SideBarMainTitle>PULL IT</SideBarMainTitle>
              <SideBarDescription>AI 학습 도구</SideBarDescription>
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
          <Settings size={16} onClick={() => navigate('/')} />
        </SideBarUserInfoItemWrapper>
      </SideBarUserInfo>
    </SideBarWrapper>
  );
}

export default SideBar;
