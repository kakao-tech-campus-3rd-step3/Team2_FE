import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/shared/api/axiosClient';
import type { WrongNoteSetResponse } from '@/features/wrong/types/wrongNote';
import type { Folder } from '@/shared/components/FolderList';

const QUESTION_SET_TYPE = 'QUESTION_SET';
const ALL_FOLDER_ID = 1;

interface QuestionSetContent {
  questionSetId: number;
}

export function useWrongNoteFilter() {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // 검색 버퍼
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // 검색 값 저장

  // 오답노트 조회
  const { isPending, data: wrongNotes } = useQuery({
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

  // 초기 폴더 선택
  useEffect(() => {
    if (folders && folders.length > 0 && selectedFolderId === null) {
      setSelectedFolderId(folders[0].id);
    }
  }, [folders, selectedFolderId]);

  // 선택된 폴더에 포함된 문제집 목록 조회
  const { data: questionSetsData } = useQuery({
    queryKey: ['questionSets', 'forFolder', selectedFolderId],
    queryFn: async () => {
      const res = await api.get(`/question-set?size=9999&folderId=${selectedFolderId}`);
      return res.data as { questionSets: { content: QuestionSetContent[] } };
    },
    enabled: selectedFolderId !== null,
  });

  // 검색어 디바운싱
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // 정규화 함수
  const normalize = (str: string) => str.toLowerCase().normalize('NFC').replace(/\s+/g, '');

  // 필터링된 오답노트 목록
  const filteredQuestionSets = wrongNotes?.filter(
    (item) =>
      normalize(item.questionSetTitle).includes(normalize(debouncedSearchTerm)) &&
      (selectedFolderId === null || selectedFolderId === ALL_FOLDER_ID
        ? true
        : (questionSetsData?.questionSets?.content || []).some(
            (qs: { questionSetId: number }) => qs.questionSetId === item.questionSetId,
          )),
  );

  return {
    // 상태
    searchTerm,
    selectedFolderId,

    // 상태 변경 함수
    setSearchTerm,
    setSelectedFolderId,

    // 데이터
    folders,
    filteredQuestionSets,

    // 로딩 상태
    isPending,
  };
}
