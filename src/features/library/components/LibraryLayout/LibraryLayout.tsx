import type { ReactNode } from 'react';
import styled from '@emotion/styled';

interface LibraryLayoutProps {
  children: ReactNode;
  contextMenu?: ReactNode;
}

const LibraryLayout = ({ children, contextMenu }: LibraryLayoutProps) => {
  return (
    <Container>
      {contextMenu}
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

export default LibraryLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.background};
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  justify-content: flex-start;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;

  @media (max-width: 1050px), (max-height: 400px) {
    max-width: 100%;
    padding: 0 ${({ theme }) => theme.spacing.spacing3};
  }
`;
