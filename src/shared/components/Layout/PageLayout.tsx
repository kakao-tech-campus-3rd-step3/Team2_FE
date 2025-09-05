import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5ff;
  display: flex;
  justify-content: center;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 500px;
  background-color: #f5f5f5ff;
`;

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Container>
      <ContentBox>{children}</ContentBox>
    </Container>
  );
};

export default PageLayout;
