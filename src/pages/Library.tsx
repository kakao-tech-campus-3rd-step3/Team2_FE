import styled from '@emotion/styled';
import LibraryTitle from '@/features/library/innerPages/LibraryTitle';
import LibraryProgressSummary from '@/features/library/components/LibraryProgressSummary';
import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/shared/api/axiosClient';
import Spacer from '@/shared/components/Spacer';

import {
  type MyQuestionSetsResponse,
  type QuestionType,
} from '@/features/library/types/questionSetResponse';

import { useNavigate } from 'react-router-dom';
import Spinner from '@/shared/components/Spinner';
import RightClickMenu from '@/features/library/components/RightClickMenu/RightClickMenu';
import RightClickMenuItem from '@/features/library/components/RightClickMenu/RightClickMenuItem';
import RightClickMenuDivider from '@/features/library/components/RightClickMenu/RightClickMenuDivider';

interface Folder {
  id: number;
  name: string;
  type: 'QUESTION_SET';
  sortOrder: number;
}

const QUESTION_SET_TYPE = 'QUESTION_SET';
const ALL_FOLDER_ID = 1;

const Container = styled.div`
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

const LibraryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
`;

const FileListSearchInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding: 12px 16px;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  border-radius: ${({ theme }) => theme.radius.radius3};
  background-color: ${({ theme }) => theme.colors.background.foreground};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.semantic.primary};
  }
`;

const FolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const FolderTag = styled.div<{
  isDragOver?: boolean;
  folderColor: string;
  folderHoverColor: string;
  isActive?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ isDragOver, folderColor, folderHoverColor, isActive }) =>
    isDragOver || isActive ? folderHoverColor : folderColor};
  border: 1px solid
    ${({ isDragOver, folderHoverColor, isActive }) =>
      isDragOver || isActive ? folderHoverColor : 'transparent'};
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;
  font-weight: ${({ isActive }) => (isActive ? '700' : '500')};
  box-shadow: ${({ isActive }) => (isActive ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none')};

  &:hover {
    background-color: ${({ folderHoverColor }) => folderHoverColor};
    border-color: ${({ folderHoverColor }) => folderHoverColor};
    color: white;
  }
`;

const AddFolderButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ theme }) => theme.colors.background.foreground};
  border: 1px dashed ${({ theme }) => theme.colors.border.border1};
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
  color: ${({ theme }) => theme.colors.text.default};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.semantic.primary};
    border-color: ${({ theme }) => theme.colors.semantic.primary};
    border-style: solid;
    color: white;
  }
`;

const FolderInputContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ theme }) => theme.colors.background.foreground};
  border: 1px solid ${({ theme }) => theme.colors.semantic.primary};
`;

const FolderInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
  color: ${({ theme }) => theme.colors.text.default};
  width: 120px;
  padding: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
  }
`;

const FolderActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.radius4};
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ListRow = styled.div<{ isDragging?: boolean }>`
  display: grid;
  grid-template-columns: 3fr 1fr 1.2fr 1fr 1fr 1.2fr;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.border1};
  transition: background-color 0.2s ease-in-out;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};

  &:last-of-type {
    border-bottom: none;
  }

  &:not(:first-of-type):hover {
    background-color: #f5f5f5;
  }

  &:not(:first-of-type) {
    cursor: grab;
  }

  &:not(:first-of-type):active {
    cursor: grabbing;
  }
`;

const ListCell = styled.div<{ align?: 'left' | 'center' | 'right' }>`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  color: ${({ theme }) => theme.colors.text.default};
  text-align: ${({ align }) => align || 'center'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderCell = styled(ListCell)`
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
`;

type QuestionSetStatus = 'PENDING' | 'COMPLETE';

const StatusCell = styled(ListCell)<{ status: QuestionSetStatus }>`
  font-weight: 500;
`;

const ActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  background-color: white;
  color: ${({ theme }) => theme.colors.text.default};
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.radius2};
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.semantic.primary};
    border-color: ${({ theme }) => theme.colors.semantic.primary};
    color: white;
  }
`;

const PrimaryButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.semantic.primary};
  border-color: ${({ theme }) => theme.colors.semantic.primary};
  color: white;
  font-weight: 600;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
`;

const TitleText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleEditInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding: 4px 8px;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ theme }) => theme.colors.background.foreground};
  width: 100%;
  flex-grow: 1;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.semantic.primary};
  }
`;

const EditIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.default};

  &:hover {
    color: ${({ theme }) => theme.colors.semantic.primary};
  }
`;

const FolderSelectWrapper = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FolderSelectLabel = styled.span`
  font-size: 14px;
  color: #333;
  white-space: nowrap;
`;

const FolderSelect = styled.select`
  flex: 1;
  padding: 6px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  border-radius: ${({ theme }) => theme.radius.radius2};
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.background.foreground};
  color: ${({ theme }) => theme.colors.text.default};
  cursor: pointer;
  outline: none;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.semantic.primary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.semantic.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const TYPE_MAP: Record<QuestionType, string> = {
  MULTIPLE_CHOICE: '객관식',
  SHORT_ANSWER: '단답형',
  TRUE_FALSE: '참/거짓',
};

const STATUS_MAP: Record<QuestionSetStatus, string> = {
  PENDING: '생성 중',
  COMPLETE: '생성완료',
};

type QuestionSetContentType = MyQuestionSetsResponse & { status: QuestionSetStatus };
interface QuestionSets {
  content: QuestionSetContentType[];
  nextCursor: number;
  hasNext: boolean;
  size: number;
}
interface QuestionSetApiResponse {
  learningProgress: number;
  questionSets: QuestionSets;
}

const FOLDER_COLORS = [
  { bg: '#3b82f6', hover: '#2563eb' }, // 파란색
  { bg: '#10b981', hover: '#059669' }, // 초록색
  { bg: '#8b5cf6', hover: '#7c3aed' }, // 보라색
  { bg: '#f59e0b', hover: '#d97706' }, // 주황색
  { bg: '#ec4899', hover: '#db2777' }, // 분홍색
  { bg: '#06b6d4', hover: '#0891b2' }, // 청록색
  { bg: '#ef4444', hover: '#dc2626' }, // 빨간색
  { bg: '#6366f1', hover: '#4f46e5' }, // 인디고
  { bg: '#14b8a6', hover: '#0d9488' }, // 틸
  { bg: '#f97316', hover: '#ea580c' }, // 오렌지
];

const getFolderColor = (folderId: number) => {
  const index = folderId % FOLDER_COLORS.length;
  return FOLDER_COLORS[index];
};

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<QuestionSetContentType | null>(null);
  const [draggedItem, setDraggedItem] = useState<QuestionSetContentType | null>(null);
  const [dragOverFolderId, setDragOverFolderId] = useState<number | null>(null);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [isVisibleFolderMenu, setIsVisibleFolderMenu] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [editingFolderName, setEditingFolderName] = useState('');

  const [mousePoint, setMousePoint] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [folderMousePoint, setFolderMousePoint] = useState<{
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

  const handleFolderContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    folder: Folder,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedFolder(folder);
    setIsVisibleFolderMenu(true);
    setFolderMousePoint({ x: e.clientX, y: e.clientY });
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
      queryClient.invalidateQueries({ queryKey: ['questionSets', selectedFolderId] });
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
      queryClient.invalidateQueries({ queryKey: ['questionSets', selectedFolderId] });
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

  const createFolderMutation = useMutation({
    mutationFn: (name: string) => {
      return api.post('/common-folders', {
        name,
        type: QUESTION_SET_TYPE,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      setIsAddingFolder(false);
      setNewFolderName('');
    },
    onError: (error) => {
      alert(`폴더 생성 중 에러가 발생했습니다: ${error.message}`);
    },
  });

  const deleteFolderMutation = useMutation({
    mutationFn: (id: number) => {
      return api.delete(`/common-folders/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      queryClient.invalidateQueries({ queryKey: ['questionSets'] });
      if (selectedFolderId === selectedFolder?.id) {
        setSelectedFolderId(null);
      }
    },
    onError: (error) => {
      alert(`폴더 삭제 중 에러가 발생했습니다: ${error.message}`);
    },
  });

  const updateFolderNameMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => {
      if (!name.trim()) {
        throw new Error('폴더 이름은 비워둘 수 없습니다.');
      }
      return api.patch(`/common-folders/${id}`, { name, type: QUESTION_SET_TYPE });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      setEditingFolderId(null);
      setEditingFolderName('');
    },
    onError: (error) => {
      alert(error.message);
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
      const res = await api.get<Folder[]>(`/common-folders?type=${QUESTION_SET_TYPE}`);
      return res.data.sort((a, b) => a.sortOrder - b.sortOrder);
    },
  });

  // 폴더가 로드되면 첫 번째 폴더를 자동 선택
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
          learningProgress: 0,
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
    setDragOverFolderId(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, folderId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverFolderId(folderId);
  };

  const handleDragLeave = () => {
    setDragOverFolderId(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, folder: Folder) => {
    e.preventDefault();
    setDragOverFolderId(null);

    if (!draggedItem) return;

    moveFolderMutation.mutate({
      questionSetId: draggedItem.questionSetId,
      folderId: folder.id,
    });

    setDraggedItem(null);
  };

  const handleAddFolder = () => {
    setIsAddingFolder(true);
  };

  const handleCancelAddFolder = () => {
    setIsAddingFolder(false);
    setNewFolderName('');
  };

  const handleConfirmAddFolder = () => {
    if (!newFolderName.trim()) {
      alert('폴더 이름을 입력해주세요.');
      return;
    }
    createFolderMutation.mutate(newFolderName.trim());
  };

  const handleFolderClick = (folderId: number) => {
    setSelectedFolderId(folderId);
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

  const handleFolderMenuRename = useCallback(() => {
    if (!selectedFolder) return;
    setEditingFolderId(selectedFolder.id);
    setEditingFolderName(selectedFolder.name);
    setIsVisibleFolderMenu(false);
  }, [selectedFolder]);

  const handleFolderMenuDelete = useCallback(async () => {
    if (!selectedFolder) return;
    setIsVisibleFolderMenu(false);

    try {
      const response = await api.get<{ questionSetCount: number }>(
        `/common-folders/${selectedFolder.id}/delete-warning`,
      );

      const questionSetCount = response.data.questionSetCount;
      const confirmMessage =
        questionSetCount > 0
          ? `'${selectedFolder.name}' 폴더에 ${questionSetCount}개의 문제집이 있습니다.\n정말로 삭제하시겠습니까?`
          : `'${selectedFolder.name}' 폴더를 정말 삭제하시겠습니까?`;

      if (window.confirm(confirmMessage)) {
        deleteFolderMutation.mutate(selectedFolder.id);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`폴더 삭제 경고 정보를 가져오는데 실패했습니다: ${errorMessage}`);
    }
  }, [selectedFolder, deleteFolderMutation]);

  const submitFolderNameEdit = (folder: Folder) => {
    updateFolderNameMutation.mutate({
      id: folder.id,
      name: editingFolderName,
    });
  };

  if (isPending || isFoldersPending) {
    return <Spinner />;
  }

  if (error) {
    return <span>에러가 발생했습니다: {error.message}</span>;
  }

  const filteredQuestionSets =
    data?.questionSets.content.filter((item) =>
      item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    ) ?? [];

  return (
    <Container>
      <RightClickMenu isVisible={isVisibleMenu} setIsVisible={setIsVisibleMenu} point={mousePoint}>
        <RightClickMenuItem
          icon="✏️"
          title="문제집 이름 변경"
          onClick={handleMenuRename}
          disabled={selectedCell?.status !== 'COMPLETE'}
        />
        <RightClickMenuItem
          icon="❌"
          title="삭제"
          onClick={handleMenuDelete}
          disabled={selectedCell?.status !== 'COMPLETE'}
        />
        <RightClickMenuDivider />
        {folders && folders.length > 0 && (
          <>
            <FolderSelectWrapper>
              <FolderSelectLabel>📁 폴더 이동</FolderSelectLabel>
              <FolderSelect
                disabled={selectedCell?.status !== 'COMPLETE'}
                defaultValue={selectedFolderId ?? ''}
                onChange={(e) => {
                  const targetFolderId = Number(e.target.value);
                  if (targetFolderId !== selectedFolderId) {
                    handleMenuMoveToFolder(targetFolderId);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </FolderSelect>
            </FolderSelectWrapper>
            <RightClickMenuDivider />
          </>
        )}
        <RightClickMenuItem
          icon="📝"
          title="문제집 풀기"
          onClick={handleMenuSolve}
          disabled={selectedCell?.status !== 'COMPLETE'}
        />
      </RightClickMenu>
      <RightClickMenu
        isVisible={isVisibleFolderMenu}
        setIsVisible={setIsVisibleFolderMenu}
        point={folderMousePoint}
      >
        <RightClickMenuItem
          icon="✏️"
          title="폴더 이름 변경"
          onClick={handleFolderMenuRename}
          disabled={selectedFolder?.id === ALL_FOLDER_ID}
        />
        <RightClickMenuItem
          icon="❌"
          title="폴더 삭제"
          onClick={handleFolderMenuDelete}
          disabled={selectedFolder?.id === ALL_FOLDER_ID}
        />
      </RightClickMenu>
      <LibraryWrapper>
        <LibraryTitle />
        <LibraryProgressSummary percent={data?.learningProgress ?? 0} />
        <Spacer height="12px" />
        {/* 검색 input창 -> 디바운싱 구현되어 있습니다. */}
        <FileListSearchInput
          placeholder="문제집 제목으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Spacer height="12px" />
        <FolderContainer>
          {folders &&
            folders.map((folder) => {
              const colors = getFolderColor(folder.id);
              const isEditingThisFolder = editingFolderId === folder.id;
              return (
                <FolderTag
                  key={folder.id}
                  isDragOver={dragOverFolderId === folder.id}
                  isActive={selectedFolderId === folder.id}
                  folderColor={colors.bg}
                  folderHoverColor={colors.hover}
                  onClick={() => handleFolderClick(folder.id)}
                  onContextMenu={(e) => handleFolderContextMenu(e, folder)}
                  onDragOver={(e) => handleDragOver(e, folder.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, folder)}
                >
                  {isEditingThisFolder ? (
                    <>
                      📁{' '}
                      <FolderInput
                        value={editingFolderName}
                        onChange={(e) => setEditingFolderName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            submitFolderNameEdit(folder);
                          }
                          if (e.key === 'Escape') {
                            setEditingFolderId(null);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                      <FolderActionButton
                        onClick={(e) => {
                          e.stopPropagation();
                          submitFolderNameEdit(folder);
                        }}
                      >
                        ✔️
                      </FolderActionButton>
                      <FolderActionButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingFolderId(null);
                        }}
                      >
                        ❌
                      </FolderActionButton>
                    </>
                  ) : (
                    <>📁 {folder.name}</>
                  )}
                </FolderTag>
              );
            })}
          {isAddingFolder ? (
            <FolderInputContainer>
              <span>📁</span>
              <FolderInput
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleConfirmAddFolder();
                  }
                  if (e.key === 'Escape') {
                    handleCancelAddFolder();
                  }
                }}
                placeholder="폴더 이름"
                autoFocus
              />
              <FolderActionButton onClick={handleConfirmAddFolder}>✔️</FolderActionButton>
              <FolderActionButton onClick={handleCancelAddFolder}>❌</FolderActionButton>
            </FolderInputContainer>
          ) : (
            <AddFolderButton onClick={handleAddFolder}>➕</AddFolderButton>
          )}
        </FolderContainer>
        <Spacer height="12px" />
        {/* 여기에서 부터 리스트 박스입니다.*/}
        <ListBox>
          <ListRow>
            <HeaderCell align="left">문제집</HeaderCell>
            <HeaderCell>문제 수</HeaderCell>
            <HeaderCell>생성일</HeaderCell>
            <HeaderCell>유형</HeaderCell>
            <HeaderCell>상태</HeaderCell>
            <HeaderCell>문제풀기</HeaderCell>
          </ListRow>

          {[...filteredQuestionSets]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 시간 내림차순
            .map((item) => {
              const isEditing = editingItemId === item.questionSetId;

              return (
                <ListRow
                  key={item.questionSetId}
                  draggable={item.status === 'COMPLETE'}
                  isDragging={draggedItem?.questionSetId === item.questionSetId}
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  onContextMenu={(e) => handleContextMenu(e, item)}
                >
                  <ListCell align="left">
                    {isEditing ? (
                      <TitleContainer>
                        <TitleEditInput
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              submitTitleEdit(item);
                            }
                            if (e.key === 'Escape') {
                              setEditingItemId(null);
                            }
                          }}
                          autoFocus
                        />
                        <div>
                          <EditIconButton onClick={() => submitTitleEdit(item)}>✔️</EditIconButton>
                          <EditIconButton onClick={() => setEditingItemId(null)}>❌</EditIconButton>
                        </div>
                      </TitleContainer>
                    ) : (
                      <TitleContainer>
                        <TitleText title={item.title}>{item.title}</TitleText>
                      </TitleContainer>
                    )}
                  </ListCell>
                  <ListCell>{item.questionCount}</ListCell>
                  <ListCell>
                    {new Intl.DateTimeFormat('sv-SE').format(new Date(item.createdAt))}
                  </ListCell>
                  <ListCell>{TYPE_MAP[item.questionType] ?? '생성 실패'}</ListCell>
                  <StatusCell status={item.status}>
                    {STATUS_MAP[item.status] ?? '생성 실패'}
                  </StatusCell>
                  <ListCell>
                    {item.status === 'COMPLETE' && (
                      <PrimaryButton onClick={() => handleSolveClick(item.questionSetId)}>
                        풀기
                      </PrimaryButton>
                    )}
                  </ListCell>
                </ListRow>
              );
            })}
        </ListBox>
      </LibraryWrapper>
    </Container>
  );
};

export default Library;
