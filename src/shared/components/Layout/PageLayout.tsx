import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
  display: flex;
  justify-content: center;
`;

const PageLayout = ({ children }: PageLayoutProps) => {
  return <Container>{children}</Container>;
};

export default PageLayout;
