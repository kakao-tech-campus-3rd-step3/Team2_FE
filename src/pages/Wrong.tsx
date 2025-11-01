import styled from '@emotion/styled';
import WrongNoteListItem from '@/features/wrong/components/WrongNoteListItem';

import api from '@/shared/api/axiosClient';
import { useQuery } from '@tanstack/react-query';
import type { WrongNoteSetResponse } from '@/features/wrong/types/wrongNote';
import { useState, useEffect } from 'react';
import Spinner from '@/shared/components/Spinner';
import FolderList from '@/shared/components/FolderList';

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
`;

const WrongPageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing2};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const WrongPageTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
`;

const WrongPageDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

// 검색바 부분
const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.spacing7};
  margin-bottom: ${({ theme }) => theme.spacing.spacing7};
`;

const SearchBarDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

const SearchBar = styled.input`
  width: 300px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  padding: ${({ theme }) => theme.spacing.spacing4};

  border: 1px solid ${({ theme }) => theme.colors.gray.gray3};
  border-radius: ${({ theme }) => theme.radius.radius2};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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
  /* border: 1px solid ${({ theme }) => theme.colors.gray.gray5}; */
  border-radius: ${({ theme }) => theme.radius.radius3};
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const WrongNoteListHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  padding: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing5};
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

const WrongNoteListHeaderColumn = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray9};
`;

// 폴더 관련 타입 + 인터페이스들
const QUESTION_SET_TYPE = 'QUESTION_SET';
const ALL_FOLDER_ID = 1;
interface Folder {
  id: number;
  name: string;
  type: 'QUESTION_SET';
  sortOrder: number;
}

interface QuestionSetContent {
  questionSetId: number;
}

function Wrong() {
  const { isPending, error, data } = useQuery({
    queryKey: ['wrongNoteSet', 'wrongNoteSetId'],
    queryFn: async () => {
      const res = await api.get<WrongNoteSetResponse>(`/wrong-answers/all`);
      return res.data;
    },
  });

  // 폴더 목록 조회
  const { data: folders } = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const res = await api.get<Folder[]>(`/common-folders?type=${QUESTION_SET_TYPE}`);
      return res.data.sort((a, b) => a.sortOrder - b.sortOrder);
    },
  });

  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  useEffect(() => {
    if (folders && folders.length > 0 && selectedFolderId === null) {
      setSelectedFolderId(folders[0].id);
    }
  }, [folders, selectedFolderId]);

  // 선택된 폴더에 포함된 문제집 목록 조회 (ID만 필요) 이 부분 좀 이상함
  const { data: questionSetsData } = useQuery({
    queryKey: ['questionSets', selectedFolderId],
    queryFn: async () => {
      const res = await api.get(`/question-set?size=9999&folderId=${selectedFolderId}`);
      return res.data as { questionSets: { content: QuestionSetContent[] } };
    },
    enabled: selectedFolderId !== null,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

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

  // 로딩
  if (isPending) return <Spinner />;
  // 에러
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
          <SearchBarDescription>
            {filteredQuestionSets?.length}개의 오답이 검색되었습니다
          </SearchBarDescription>
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
        />
        <WrongNoteList>
          <WrongNoteListHeader>
            <WrongNoteListHeaderColumn>문제집</WrongNoteListHeaderColumn>
            <WrongNoteListHeaderColumn>오답 수</WrongNoteListHeaderColumn>
            <WrongNoteListHeaderColumn>유형</WrongNoteListHeaderColumn>
            <WrongNoteListHeaderColumn>폴더</WrongNoteListHeaderColumn>
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
