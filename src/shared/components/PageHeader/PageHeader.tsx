import styled from '@emotion/styled';
import { useMenu } from "@/shared/hooks/SideBarContext/MenuContext";

const PageHeaderWrapper = styled.header`
    width: 100%;
    height: 72px;
    padding: 18px;
    border-bottom: 1px solid ${(props) => props.theme.colors.sidebarBorder};
    background-color: #fafafa;
    display: flex;
    align-items: center;
`

const PageTitle = styled.h1`
    color: ${(props) => props.theme.colors.sidebarForeground};
    font-size: ${(props) => props.theme.textStyles.title2Bold.fontSize};
`

function PageHeader() {
    const { selectedMenu } = useMenu();

    return (
        <PageHeaderWrapper>
            <PageTitle>{selectedMenu}</PageTitle>
        </PageHeaderWrapper>
    )
}

export default PageHeader;