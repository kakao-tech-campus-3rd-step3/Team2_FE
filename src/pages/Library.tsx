// External libraries
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Feature components & types
import LibraryLayout from '@/features/library/components/LibraryLayout';
import LibrarySearchInput from '@/features/library/components/LibrarySearchInput';
import LibraryContextMenu from '@/features/library/components/LibraryContextMenu';
import QuestionSetList from '@/features/library/components/QuestionSetList';
import LibraryTitle from '@/features/library/innerPages/LibraryTitle';
import LibraryProgressSummary from '@/features/library/components/LibraryProgressSummary';
import { type QuestionSetContentType } from '@/features/library/types/questionSetResponse';
import type { LearnStatsResponse } from '@/features/dashboard/types/learnStats';

// Shared components & utils
import FolderList, { type Folder as FolderRes } from '@/shared/components/FolderList';
import Spacer from '@/shared/components/Spacer';
import Spinner from '@/shared/components/Spinner';
import api from '@/shared/api/axiosClient';

const QUESTION_SET_TYPE = 'QUESTION_SET';

interface QuestionSets {
  content: QuestionSetContentType[];
  nextCursor: number;
  hasNext: boolean;
  size: number;
}
interface QuestionSetApiResponse {
  learnStats: LearnStatsResponse;
  questionSets: QuestionSets;
}

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<QuestionSetContentType | null>(null);
  const [draggedItem, setDraggedItem] = useState<QuestionSetContentType | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const [mousePoint, setMousePoint] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: QuestionSetContentType,
  ) => {
    e.preventDefault();

    setSelectedCell(item);
    setIsVisibleMenu(true);
    setMousePoint({ x: e.clientX, y: e.clientY });
  };

  // 모바일 길게 누르기 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, item: QuestionSetContentType) => {
    const touch = e.touches[0];
    const timer = setTimeout(() => {
      setSelectedCell(item);
      setIsVisibleMenu(true);
      setMousePoint({ x: touch.clientX, y: touch.clientY });
    }, 500); // 500ms 길게 누르기
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleTouchMove = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const updateTitleMutation = useMutation({
    mutationFn: ({ id, title }: { id: number | undefined; title: string }) => {
      if (id === undefined || id === null) {
        throw new Error('문제집 ID가 없어 제목을 수정할 수 없습니다.');
      }
      if (!title.trim()) {
        throw new Error('제목은 비워둘 수 없습니다.');
      }
      return api.patch(`/question-set/${id}`, { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questionSets', selectedFolderId],
      });
      setEditingItemId(null);
      setEditingTitle('');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return api.delete(`/question-set/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questionSets', selectedFolderId],
      });
    },
    onError: (error) => {
      alert(`삭제 중 에러가 발생했습니다: ${error.message}`);
    },
  });

  const moveFolderMutation = useMutation({
    mutationFn: ({ questionSetId, folderId }: { questionSetId: number; folderId: number }) => {
      return api.patch(`/question-set/${questionSetId}`, {
        commonFolderId: folderId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      queryClient.invalidateQueries({ queryKey: ['questionSets'] });
    },
    onError: (error) => {
      alert(`폴더 이동 중 에러가 발생했습니다: ${error.message}`);
    },
  });

  const submitTitleEdit = (item: QuestionSetContentType) => {
    updateTitleMutation.mutate({
      id: item.questionSetId,
      title: editingTitle,
    });
  };

  const handleSolveClick = useCallback(
    (questionSetId: number) => {
      navigate(`/solve/${questionSetId}`);
    },
    [navigate],
  );

  const handleDeleteClick = useCallback(
    (item: QuestionSetContentType) => {
      if (window.confirm(`'${item.title}' 문제집을 정말 삭제하시겠습니까?`)) {
        deleteMutation.mutate(item.questionSetId);
      }
    },
    [deleteMutation],
  );

  const handleRenameClick = useCallback(
    (item: QuestionSetContentType) => {
      setEditingItemId(item.questionSetId);
      setEditingTitle(item.title);
    },
    [setEditingItemId, setEditingTitle],
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const { data: folders, isPending: isFoldersPending } = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const res = await api.get<FolderRes[]>(`/common-folders?type=${QUESTION_SET_TYPE}`);
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

  const { isPending, error, data } = useQuery({
    queryKey: ['questionSets', selectedFolderId],
    queryFn: async () => {
      if (selectedFolderId === null) {
        return {
          learnStats: { totalCorrectQuestionCount: 0, totalQuestionCount: 0 },
          questionSets: { content: [], nextCursor: 0, hasNext: false, size: 0 },
        };
      }
      const res = await api.get<QuestionSetApiResponse>(
        `/question-set?size=9999&folderId=${selectedFolderId}`,
      );
      return res.data;
    },
    enabled: selectedFolderId !== null,
    refetchInterval: (query) =>
      query.state.data?.questionSets.content.some((item) => item.status === 'PENDING')
        ? 5000
        : false,
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: QuestionSetContentType) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleMenuRename = useCallback(() => {
    if (!selectedCell) return;
    handleRenameClick(selectedCell);
    setIsVisibleMenu(false);
  }, [selectedCell, handleRenameClick]);

  const handleMenuDelete = useCallback(() => {
    if (!selectedCell) return;
    handleDeleteClick(selectedCell);
    setIsVisibleMenu(false);
  }, [selectedCell, handleDeleteClick]);

  const handleMenuSolve = useCallback(() => {
    if (!selectedCell) return;
    handleSolveClick(selectedCell.questionSetId);
    setIsVisibleMenu(false);
  }, [selectedCell, handleSolveClick]);

  const handleMenuMoveToFolder = useCallback(
    (folderId: number) => {
      if (!selectedCell) return;
      moveFolderMutation.mutate({
        questionSetId: selectedCell.questionSetId,
        folderId: folderId,
      });
      setIsVisibleMenu(false);
    },
    [selectedCell, moveFolderMutation],
  );

  if (isPending || isFoldersPending) {
    return <Spinner />;
  }

  if (error) {
    return <span>에러가 발생했습니다: {error.message}</span>;
  }

  const filteredQuestionSets =
    data?.questionSets.content.filter((item) =>
      item.title
        ?.normalize('NFC') // macOS NFD → NFC 변환
        .toLowerCase()
        .includes(debouncedSearchTerm.trim().normalize('NFC').toLowerCase()),
    ) ?? [];

  const displayedQuestionSets = [...filteredQuestionSets]
    .filter((item) => item.status !== 'FAILED')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <LibraryLayout
      contextMenu={
        <LibraryContextMenu
          isVisible={isVisibleMenu}
          setIsVisible={setIsVisibleMenu}
          point={mousePoint}
          selectedCell={selectedCell}
          folders={folders}
          selectedFolderId={selectedFolderId}
          onRename={handleMenuRename}
          onDelete={handleMenuDelete}
          onSolve={handleMenuSolve}
          onMove={handleMenuMoveToFolder}
        />
      }
    >
      <LibraryTitle />
      <Spacer height="10px" />
      <LibraryProgressSummary
        percent={
          data
            ? Math.floor(
                (data.learnStats.totalCorrectQuestionCount / data.learnStats.totalQuestionCount) *
                  100,
              )
            : 0
        }
      />
      <Spacer height="12px" />
      <LibrarySearchInput
        placeholder="문제집 제목으로 검색"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Spacer height="12px" />
      <FolderList
        folders={folders}
        selectedFolderId={selectedFolderId}
        onFolderSelect={setSelectedFolderId}
        draggedItem={draggedItem}
        onItemDrop={(folderId, questionSetId) => {
          moveFolderMutation.mutate({ questionSetId, folderId });
        }}
      />
      <Spacer height="12px" />
      <QuestionSetList
        questionSets={displayedQuestionSets}
        draggedItem={draggedItem}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        editingItemId={editingItemId}
        editingTitle={editingTitle}
        onEditingTitleChange={(value) => setEditingTitle(value)}
        onSubmitTitleEdit={submitTitleEdit}
        onCancelTitleEdit={() => setEditingItemId(null)}
        onSolve={handleSolveClick}
      />
    </LibraryLayout>
  );
};

export default Library;
