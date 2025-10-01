import Lists from '@/features/library/innerPages/Lists';
import PageLayout from '@/shared/components/Layout/PageLayout';
import styled from '@emotion/styled';

const LibraryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 900px;
  height: calc(100dvh - 100px);
  background-color: ${({ theme }) => theme.colors.gray.gray2};
`;
const Library = () => {
  return (
    <PageLayout>
      <LibraryWrapper>
        <Lists></Lists>
      </LibraryWrapper>
    </PageLayout>
  );
};

export default Library;
