import Lists from '@/features/library/innerPages/Lists';
import PageLayout from '@/shared/components/Layout/PageLayout';
import styled from '@emotion/styled';

const LibraryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 800px;
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
