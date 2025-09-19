import { MIN_HEIGHT } from '@/shared/config/constants';
import styled from '@emotion/styled';

export const PageLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: ${MIN_HEIGHT};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  flex: 1;
`;
export const PageContent = styled.div`
  width: 100%;
  flex: 1;
`;
