import { MIN_HEIGHT } from '@/shared/constants';
import styled from '@emotion/styled';

export const PageLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: ${MIN_HEIGHT};
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebarBorder};
`;
export const PageContent = styled.div`
  width: 100%;
  flex: 1;
`;
