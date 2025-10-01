import Lists from '@/features/library/innerPages/Lists';
import PageLayout from '@/shared/components/Layout/PageLayout';
import styled from '@emotion/styled';

const LibraryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  border: 1px solid black;
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
