import styled from '@emotion/styled';
import WrongNoteListItem from '@/features/wrong/components/WrongNoteListItem';
import SearchBar from '@/features/wrong/components/SearchBar';
import { useWrongNoteFilter } from '@/features/wrong/hooks/useWrongNoteFilter';

import Spinner from '@/shared/components/Spinner';
import FolderList from '@/shared/components/FolderList';

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

// 오답노트 리스트 부분
const WrongNoteList = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.radius4};
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const WrongNoteListHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing4} ${({ theme }) => theme.spacing.spacing6};
  transition: background-color 0.2s ease-in-out;

  @media (max-width: 1050px), (max-height: 400px) {
    display: none;
  }
`;

const WrongNoteListHeaderColumn = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};

  &:not(:first-of-type) {
    text-align: center;
  }
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
        <WrongNoteList>
          <WrongNoteListHeader>
            <WrongNoteListHeaderColumn>문제집</WrongNoteListHeaderColumn>
            <WrongNoteListHeaderColumn>오답 수</WrongNoteListHeaderColumn>
            <WrongNoteListHeaderColumn>유형</WrongNoteListHeaderColumn>
            <WrongNoteListHeaderColumn>오답노트</WrongNoteListHeaderColumn>
          </WrongNoteListHeader>
          {filteredQuestionSets?.map((item) => (
            <WrongNoteListItem key={item.questionSetId} item={item} />
          ))}
        </WrongNoteList>
      </ContentWrapper>
    </WrongWrapper>
  );
}

export default Wrong;
