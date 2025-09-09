import { MIN_HEIGHT } from '@/shared/constants';
import styled from '@emotion/styled';

const AppLayout = styled.div`
  width: 100%;
  height: 100dvh;
  min-height: ${MIN_HEIGHT};
  display: flex;
  overflow: auto;
`;

export default AppLayout;
