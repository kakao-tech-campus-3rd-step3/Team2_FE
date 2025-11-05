import styled from '@emotion/styled';
import WrongNoteListItem from '@/features/wrong/components/WrongNoteListItem';

import api from '@/shared/api/axiosClient';
import { useQuery } from '@tanstack/react-query';
import type { WrongNoteSetResponse } from '@/features/wrong/types/wrongNote';
import { useState, useEffect } from 'react';
import Spinner from '@/shared/components/Spinner';
import FolderList, { type Folder } from '@/shared/components/FolderList';

// prettier 돌려줘
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

  @media (max-width: 1050px) {
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

// 검색바 부분
const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.spacing3} 0;
`;

const SearchBar = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  padding: ${({ theme }) => theme.spacing.spacing3} ${({ theme }) => theme.spacing.spacing4};

  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius3};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.semantic.primary};
    border-radius: ${({ theme }) => theme.radius.radius2};
  }
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

  @media (max-width: 1050px) {
    display: none; /* 모바일에서 헤더 숨김 */
  }
`;

const WrongNoteListHeaderColumn = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};

  &:not(:first-child) {
    text-align: center;
  }
`;

// 폴더 관련 타입 + 인터페이스들
const QUESTION_SET_TYPE = 'QUESTION_SET';
const ALL_FOLDER_ID = 1;

interface QuestionSetContent {
  questionSetId: number;
}

function Wrong() {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // 검색 버퍼
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // 검색 값 저장
  // 오답노트 조회
  const { isPending, error, data } = useQuery({
    queryKey: ['wrongNotes', 'list'],
    queryFn: async () => {
      const res = await api.get<WrongNoteSetResponse>(`/wrong-answers/all`);
      return res.data;
    },
  });

  // 폴더 목록 조회
  const { data: folders } = useQuery({
    queryKey: ['folders', 'all'],
    queryFn: async () => {
      const res = await api.get<Folder[]>(`/common-folders?type=${QUESTION_SET_TYPE}`);
      return res.data.sort((a, b) => {
        if (a.scope === 'ALL' && b.scope !== 'ALL') return -1;
        if (a.scope !== 'ALL' && b.scope === 'ALL') return 1;
        return a.sortOrder - b.sortOrder;
      });
    },
  });

  useEffect(() => {
    if (folders && folders.length > 0 && selectedFolderId === null) {
      setSelectedFolderId(folders[0].id);
    }
  }, [folders, selectedFolderId]);

  // 선택된 폴더에 포함된 문제집 목록 조회 (ID만 필요) 이 부분 좀 이상함
  const { data: questionSetsData } = useQuery({
    queryKey: ['questionSets', 'forFolder', selectedFolderId],
    queryFn: async () => {
      const res = await api.get(`/question-set?size=9999&folderId=${selectedFolderId}`);
      return res.data as { questionSets: { content: QuestionSetContent[] } };
    },
    enabled: selectedFolderId !== null,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const normalize = (str: string) => str.toLowerCase().normalize('NFC').replace(/\s+/g, '');

  const filteredQuestionSets = data?.filter(
    (item) =>
      normalize(item.questionSetTitle).includes(normalize(debouncedSearchTerm)) &&
      // 폴더 필터 적용: 선택된 폴더가 없거나 ALL_FOLDER_ID이면 전체 표시
      (selectedFolderId === null || selectedFolderId === ALL_FOLDER_ID
        ? true
        : // 선택된 폴더에 포함된 questionSetId인지 확인
          (questionSetsData?.questionSets?.content || []).some(
            (qs: { questionSetId: number }) => qs.questionSetId === item.questionSetId,
          )),
  );
  // TODO: 나중에 에러 바운더리랑 서스팬스 적용되면 지울수도???
  if (isPending) return <Spinner />;
  if (error) return <h1>Error</h1>;

  return (
    <WrongWrapper>
      <ContentWrapper>
        <WrongPageTitleWrapper>
          <WrongPageTitle>오답노트</WrongPageTitle>
        </WrongPageTitleWrapper>
        <WrongPageDescription>
          문제집별로 틀린 문제를 분석하고 완벽히 이해할 때까지 학습하세요
        </WrongPageDescription>
        <SearchBarWrapper>
          <SearchBar
            placeholder="오답노트 제목으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBarWrapper>
        <FolderList
          folders={folders}
          selectedFolderId={selectedFolderId}
          onFolderSelect={setSelectedFolderId}
          // Wrong 페이지에서는 드래그로 문제집을 이동시키는 기능을 아직 사용하지 않으므로 null/noop 전달
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
