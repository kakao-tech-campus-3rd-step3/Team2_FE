// External libraries
import styled from '@emotion/styled';

// feature components & hooks
import SearchBar from '@/features/wrong/components/SearchBar';
import WrongNoteTable from '@/features/wrong/components/WrongNoteTable';
import { useWrongNoteFilter } from '@/features/wrong/hooks/useWrongNoteFilter';

// Shared components
import FolderList from '@/shared/components/FolderList';
import Spinner from '@/shared/components/Spinner';

const WrongWrapper = styled.div`
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

const WrongPageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const WrongPageTitle = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
  text-align: left;
  padding: 5px 0px;
`;

const WrongPageDescription = styled.p`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray6};
  text-align: left;
`;

function Wrong() {
  const {
    searchTerm,
    selectedFolderId,
    setSearchTerm,
    setSelectedFolderId,
    folders,
    filteredQuestionSets,
    isPending,
  } = useWrongNoteFilter();

  if (isPending) return <Spinner />;

  return (
    <WrongWrapper>
      <ContentWrapper>
        <WrongPageTitleWrapper>
          <WrongPageTitle>오답노트</WrongPageTitle>
        </WrongPageTitleWrapper>
        <WrongPageDescription>
          문제집별로 틀린 문제를 분석하고 완벽히 이해할 때까지 학습하세요
        </WrongPageDescription>
        <SearchBar
          placeholder="오답노트 제목으로 검색"
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <FolderList
          folders={folders}
          selectedFolderId={selectedFolderId}
          onFolderSelect={setSelectedFolderId}
          draggedItem={null}
          onItemDrop={() => {
            /* noop */
          }}
          addFolderDisabled={true}
          rightClickDisabled={true}
        />
        <WrongNoteTable questionSets={filteredQuestionSets} />
      </ContentWrapper>
    </WrongWrapper>
  );
}

export default Wrong;
