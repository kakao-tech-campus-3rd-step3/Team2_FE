import styled from '@emotion/styled';

import { FileText, Sidebar, Settings, LayoutDashboard, Plus, BookOpen, CircleX } from 'lucide-react';

// 사이드바
const SideBarWrapper = styled.nav<{ isOpen: boolean }>`
    width: ${(props) => (props.isOpen ? props.theme.space.spacing60 : "0px")};
    height: 100dvh;
    border: 1px solid ${(props) => props.theme.colors.sidebarBorder};

    display: flex;
    flex-direction: column;

    transition: width 0.3s ease-in-out;
    overflow: hidden; 
`

// 사이드바 헤더
const SideBarHeader = styled.header`
    width: auto;
    height: ${(props) => props.theme.space.spacing19};
    padding: ${(props) => props.theme.space.spacing5};

    border-bottom: 1px solid ${(props) => props.theme.colors.sidebarBorder};
`

const SideBarHeaderItemWrapper = styled.div`
    width: auto;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

`

const IconTitleWrapper = styled.div`
    display: flex;
`

const StyledIconContainer = styled.div`
  background-color: #4caf50; 
  color: #ffffff; 
  width: 28px;
  height: 28px;
  border-radius: 8px; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemTitleWrapper = styled.div`
    display:flex;
    flex-direction: column;
    margin-left: 12px;
`

const SideBarMainTitle = styled.h1`
    font-size: 12px;
    font-weight: bold;
`

const SideBarDescription = styled.p`
    font-size: 8px;
    color: gray;
`

// 사이드바 메인
const SideBarMain = styled.div`
    width: auto;
    height: 100%;
    padding: ${(props) => props.theme.space.spacing5};

`

const SideBarNav = styled.nav`
    display: flex;
    flex-direction: column;
`

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


    background-color: ${(props ) =>
    props.active && props.theme.colors.sidebarAccent};

    &:hover {
        background-color: ${(props) => props.theme.colors.sidebarHover};
    }

`

const SideBarNavTxt = styled.p`
    font-size: ${(props) => props.theme.textStyles.label1Bold.fontSize};
    margin-left: ${(props) => props.theme.space.spacing2};
`

// 사이드바 유저 정보
const SideBarUserInfo = styled.div`
    width: auto;
    height: ${(props) => props.theme.space.spacing19};
    padding: ${(props) => props.theme.space.spacing5};

    border-top: 1px solid ${(props) => props.theme.colors.sidebarBorder};
`

const SideBarUserInfoItemWrapper = styled.div`
    width: auto;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SideBarUserInfoAvatarTextWrapper = styled.div`
    display: flex;
    
`

const SideBarUserInfoAvatar = styled.div`
    background-color: ${(props) => props.theme.colors.sidebarAccent};
    font-size: ${(props) => props.theme.textStyles.label2Regular.fontSize};
    border-radius: ${(props) => props.theme.radius.radiusFull};
    width: ${(props) => props.theme.space.spacing7};
    height: ${(props) => props.theme.space.spacing7};

    display: flex;
    justify-content: center;
    align-items: center;
`

const SideBarUserInfoTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 12px;
`

const SideBarUserInfoName = styled.p`
    font-size: 12px;
    font-weight: bold;
`

const SideBarUserInfoEmail = styled.p`
    font-size: 8px;
    color: gray;
`

const menus = ["대시보드", "학습소스 관리", "문제집 생성", "나의 문제집", "오답노트"];

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
                        <StyledIconContainer>
                            <FileText size={16} />
                        </StyledIconContainer>
                        <ItemTitleWrapper>
                            <SideBarMainTitle>PULL IT</SideBarMainTitle>
                            <SideBarDescription>AI 학습 도구</SideBarDescription>
                        </ItemTitleWrapper>
                    </IconTitleWrapper>
                    {/* 이 부분 아이콘 가져다쓰는거랑 컴포넌트 이름이 같네? 먼 문제생길수도?? */}
                    <Sidebar size={16} onClick={() => setIsOpen(false)}/> 
                </SideBarHeaderItemWrapper>
            </SideBarHeader>

            {/* 사이드바 메인 부분 */}
            <SideBarMain>
                <SideBarNav>
                    <SideBarNavItem onClick={() => setSelectedMenu(menus[0])} active={menus[0] === selectedMenu}>
                        <LayoutDashboard size={14} />
                        <SideBarNavTxt>대시보드</SideBarNavTxt>
                    </SideBarNavItem>
                    <SideBarNavItem onClick={() => setSelectedMenu(menus[1])} active={menus[1] === selectedMenu}>
                        <FileText size={14} />
                        <SideBarNavTxt>학습소스 관리</SideBarNavTxt>
                    </SideBarNavItem>
                    <SideBarNavItem onClick={() => setSelectedMenu(menus[2])} active={menus[2] === selectedMenu}>
                        <Plus size={14} />
                        <SideBarNavTxt>문제집 생성</SideBarNavTxt>
                    </SideBarNavItem>
                    <SideBarNavItem onClick={() => setSelectedMenu(menus[3])} active={menus[3] === selectedMenu}>
                        <BookOpen size={14} />
                        <SideBarNavTxt>나의 문제집</SideBarNavTxt>
                    </SideBarNavItem>
                    <SideBarNavItem onClick={() => setSelectedMenu(menus[4])} active={menus[4] === selectedMenu}>
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
    )
}

export default SideBar;
