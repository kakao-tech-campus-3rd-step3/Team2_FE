import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
  display: flex;
  justify-content: center;
`;

// const ContentBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 700px;
//   height: 500px;
//   background-color: ${({ theme }) => theme.colors.gray.gray2};
// `;

const PageLayout = ({ children }: PageLayoutProps) => {
  return <Container>{children}</Container>;
};

export default PageLayout;
