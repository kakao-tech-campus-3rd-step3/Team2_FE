// src/features/library/Library.tsx
import styled from '@emotion/styled';
import LibraryTitle from '@/features/library/innerPages/LibraryTitle';
import LibraryProgressSummary from '@/features/library/components/LibraryProgressSummary';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const LibraryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 100%;
  max-width: 1000px;
`;

const Library = () => {
  // 추후 API 호출해서 받아올 예정
  const totalCount = 5;
  const completedCount = 1;

  return (
    <Container>
      <LibraryWrapper>
        <LibraryTitle />
        <LibraryProgressSummary totalCount={totalCount} completedCount={completedCount} />
      </LibraryWrapper>
    </Container>
  );
};

export default Library;
