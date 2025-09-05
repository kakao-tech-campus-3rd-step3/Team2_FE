import styled from '@emotion/styled';

const PageLayout = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebarBorder};
`;

export default PageLayout;
