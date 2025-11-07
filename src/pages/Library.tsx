// External libraries
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2, FileEdit, Folder, Check, X } from 'lucide-react';
import styled from '@emotion/styled';

// Feature components & types
import LibraryTitle from '@/features/library/innerPages/LibraryTitle';
import LibraryProgressSummary from '@/features/library/components/LibraryProgressSummary';
import RightClickMenu from '@/features/library/components/RightClickMenu/RightClickMenu';
import RightClickMenuItem from '@/features/library/components/RightClickMenu/RightClickMenuItem';
import RightClickMenuDivider from '@/features/library/components/RightClickMenu/RightClickMenuDivider';
import {
  type QuestionType,
  type QuestionSetContentType,
  type LearningStatus,
} from '@/features/library/types/questionSetResponse';
import type { LearnStatsResponse } from '@/features/dashboard/types/learnStats';

// Shared components & utils
import FolderList, { type Folder as FolderRes } from '@/shared/components/FolderList';
import Spacer from '@/shared/components/Spacer';
import Spinner from '@/shared/components/Spinner';
import api from '@/shared/api/axiosClient';
import { getFolderColor } from '@/shared/constants/folderColors';

const QUESTION_SET_TYPE = 'QUESTION_SET';

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

  @media (max-width: 1050px), (max-height: 400px) {
    max-width: 100%;
    padding: 0 ${({ theme }) => theme.spacing.spacing3};
  }
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

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.radius4};
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ListRow = styled.div<{ isDragging?: boolean; isDisabled?: boolean }>`
  display: grid;
  grid-template-columns: 3fr 1fr 1.2fr 1fr 1fr 0.8fr 1.2fr;
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
    cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'grab')};
  }

  &:not(:first-of-type):active {
    cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'grabbing')};
  }

  @media (max-width: 1050px), (max-height: 400px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.spacing3};
    padding: ${({ theme }) => theme.spacing.spacing4};

    &:first-of-type {
      display: none; /* 헤더 숨김 */
    }

    &:not(:first-of-type) {
      cursor: default;
    }

    &:not(:first-of-type):active {
      cursor: default;
    }
  }
`;

const ListCell = styled.div<{ align?: 'left' | 'center' | 'right'; isDisabled?: boolean }>`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  color: ${({ isDisabled, theme }) => (isDisabled ? '#999' : theme.colors.text.default)};
  text-align: ${({ align }) => align || 'center'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1050px), (max-height: 400px) {
    text-align: left;
    white-space: normal;
    width: 100%;
  }
`;

const HeaderCell = styled(ListCell)`
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
`;

const FolderCellContent = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  max-width: 100%;
`;

const FolderColorDot = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
  margin-left: 2px;
`;

const FolderText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;

const DEFAULT_FOLDER_COLOR = '#d1d5db';

const LoadingSpinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #16a34a;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
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

  @media (max-width: 1050px), (max-height: 400px) {
    width: 100%;
    padding: 10px 16px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 양쪽 정렬 */
  gap: 8px;
  max-width: 100%;
`;

const TitleTextWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 0; /* flex-shrink 작동 */
  flex: 1; /* 남는 공간 모두 차지 */
`;

const TitleText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
  flex-grow: 1;
`;

const SourceNames = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray.gray6};
  margin-top: 4px;
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
  display: flex;
  align-items: center;
  gap: 8px;
  width: 200px;
`;

const FolderSelectLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.default};
  white-space: nowrap;
  flex-shrink: 0;
`;

const FolderSelect = styled.select`
  flex: 1;
  min-width: 0;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  border-radius: ${({ theme }) => theme.radius.radius2};
  font-size: 13px;
  background-color: ${({ theme }) => theme.colors.background.foreground};
  color: ${({ theme }) => theme.colors.text.default};
  cursor: pointer;
  outline: none;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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

const MobileInfoRow = styled.div`
  display: none;

  @media (max-width: 1050px), (max-height: 400px) {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.spacing3};
    width: 100%;
    font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
    color: ${({ theme }) => theme.colors.gray.gray7};
  }
`;

const MobileInfoItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const MobileFolderInfo = styled.div`
  display: none;

  @media (max-width: 1050px), (max-height: 400px) {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: ${({ theme }) => theme.spacing.spacing2};
    background-color: ${({ theme }) => theme.colors.gray.gray1};
    border-radius: ${({ theme }) => theme.radius.radius2};
    font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
  }
`;

const DesktopOnly = styled(ListCell)`
  @media (max-width: 1050px), (max-height: 400px) {
    display: none;
  }
`;

const LEARNING_STATUS_TEXT: Record<LearningStatus, string> = {
  NOT_STARTED: '대기',
  IN_PROGRESS: '진행 중',
  COMPLETED: '완료',
};

const LEARNING_STATUS_STYLES: Record<LearningStatus, { background: string; color: string }> = {
  NOT_STARTED: { background: '#f3f4f6', color: '#4b5563' }, // gray
  IN_PROGRESS: { background: '#fffbeb', color: '#d97706' }, // amber
  COMPLETED: { background: '#ecfdf5', color: '#059669' }, // green
};

const LearningStatusBadge = styled.span<{ status: LearningStatus }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.radius2};
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
  font-weight: 600;
  background-color: ${({ status }) => LEARNING_STATUS_STYLES[status].background};
  color: ${({ status }) => LEARNING_STATUS_STYLES[status].color};
`;

const TYPE_MAP: Record<QuestionType, string> = {
  MULTIPLE_CHOICE: '객관식',
  SHORT_ANSWER: '단답형',
  TRUE_FALSE: '참/거짓',
};

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

  const isSelectedCellPending = selectedCell?.status === 'PENDING';
  const selectedFolder = folders?.find((f) => f.id === selectedFolderId);
  const selectedFolderName = selectedFolder?.name ?? '';

  return (
    <Container>
      <RightClickMenu isVisible={isVisibleMenu} setIsVisible={setIsVisibleMenu} point={mousePoint}>
        <RightClickMenuItem
          icon={Pencil}
          onClick={handleMenuRename}
          disabled={isSelectedCellPending}
        >
          문제집 이름 변경
        </RightClickMenuItem>
        <RightClickMenuItem
          icon={Trash2}
          onClick={handleMenuDelete}
          disabled={isSelectedCellPending}
        >
          삭제
        </RightClickMenuItem>
        <RightClickMenuDivider />
        {folders && folders.length > 0 && (
          <>
            <RightClickMenuItem icon={Folder} disabled={isSelectedCellPending}>
              <FolderSelectWrapper>
                <FolderSelectLabel>폴더 이동</FolderSelectLabel>
                <FolderSelect
                  disabled={isSelectedCellPending}
                  value={selectedCell?.commonFolderId ?? selectedFolderId ?? ''}
                  title={selectedFolderName}
                  onChange={(e) => {
                    const targetFolderId = Number(e.target.value);
                    if (targetFolderId !== selectedCell?.commonFolderId) {
                      handleMenuMoveToFolder(targetFolderId);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id} title={folder.name}>
                      {folder.name}
                    </option>
                  ))}
                </FolderSelect>
              </FolderSelectWrapper>
            </RightClickMenuItem>
            <RightClickMenuDivider />
          </>
        )}
        <RightClickMenuItem
          icon={FileEdit}
          onClick={handleMenuSolve}
          disabled={isSelectedCellPending}
        >
          문제집 풀기
        </RightClickMenuItem>
      </RightClickMenu>

      <LibraryWrapper>
        <LibraryTitle />
        <Spacer height={'10px'} />
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
        <FileListSearchInput
          placeholder="문제집 제목으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        <ListBox>
          <ListRow>
            <HeaderCell>문제집</HeaderCell>
            <HeaderCell>문제 수</HeaderCell>
            <HeaderCell>생성일</HeaderCell>
            <HeaderCell>유형</HeaderCell>
            <HeaderCell>학습 상태</HeaderCell>
            <HeaderCell>폴더</HeaderCell>
            <HeaderCell>문제풀기</HeaderCell>
          </ListRow>

          {[...filteredQuestionSets]
            .filter((item) => item.status !== 'FAILED')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((item) => {
              const isEditing = editingItemId === item.questionSetId;
              const isPending = item.status === 'PENDING';

              return (
                <ListRow
                  key={item.questionSetId}
                  draggable={item.status === 'COMPLETE'}
                  isDragging={draggedItem?.questionSetId === item.questionSetId}
                  isDisabled={isPending}
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  onContextMenu={(e) => handleContextMenu(e, item)}
                  onTouchStart={(e) => handleTouchStart(e, item)}
                  onTouchEnd={handleTouchEnd}
                  onTouchMove={handleTouchMove}
                >
                  <ListCell align="left" isDisabled={isPending}>
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
                          <EditIconButton onClick={() => submitTitleEdit(item)}>
                            <Check size={16} />
                          </EditIconButton>
                          <EditIconButton onClick={() => setEditingItemId(null)}>
                            <X size={16} />
                          </EditIconButton>
                        </div>
                      </TitleContainer>
                    ) : (
                      <div>
                        <TitleContainer>
                          {isPending && <LoadingSpinner />}
                          <TitleTextWrapper>
                            <TitleText title={item.title}>{item.title}</TitleText>
                          </TitleTextWrapper>
                        </TitleContainer>

                        {item.sourceNames && item.sourceNames.length > 0 && (
                          <SourceNames title={item.sourceNames.join(', ')}>
                            자료: {item.sourceNames.join(', ')}
                          </SourceNames>
                        )}
                      </div>
                    )}
                  </ListCell>

                  {/* 데스크톱 전용 셀들 */}
                  <DesktopOnly isDisabled={isPending}>{item.questionCount}</DesktopOnly>
                  <DesktopOnly isDisabled={isPending}>
                    {new Intl.DateTimeFormat('sv-SE').format(new Date(item.createdAt))}
                  </DesktopOnly>
                  <DesktopOnly isDisabled={isPending}>
                    {TYPE_MAP[item.questionType] ?? '생성 실패'}
                  </DesktopOnly>
                  <DesktopOnly isDisabled={isPending}>
                    <LearningStatusBadge status={item.learningStatus}>
                      {LEARNING_STATUS_TEXT[item.learningStatus]}
                    </LearningStatusBadge>
                  </DesktopOnly>
                  <DesktopOnly
                    align="left"
                    isDisabled={isPending}
                    title={item.commonFolderName ?? undefined}
                  >
                    <FolderCellContent>
                      <FolderColorDot
                        color={
                          item.commonFolderId
                            ? getFolderColor(item.commonFolderId).bg
                            : DEFAULT_FOLDER_COLOR
                        }
                      />
                      <FolderText>{item.commonFolderName ?? '-'}</FolderText>
                    </FolderCellContent>
                  </DesktopOnly>

                  {/* 모바일 전용 정보 */}
                  <MobileInfoRow>
                    <MobileInfoItem>문제 수: {item.questionCount}개</MobileInfoItem>
                    <MobileInfoItem>
                      유형: {TYPE_MAP[item.questionType] ?? '생성 실패'}
                    </MobileInfoItem>
                    <MobileInfoItem>
                      학습 상태: {LEARNING_STATUS_TEXT[item.learningStatus]}
                    </MobileInfoItem>
                    <MobileInfoItem>
                      생성일: {new Intl.DateTimeFormat('sv-SE').format(new Date(item.createdAt))}
                    </MobileInfoItem>
                  </MobileInfoRow>

                  <MobileFolderInfo>
                    <FolderColorDot
                      color={
                        item.commonFolderId
                          ? getFolderColor(item.commonFolderId).bg
                          : DEFAULT_FOLDER_COLOR
                      }
                    />
                    <span title={item.commonFolderName ?? undefined}>
                      폴더: {item.commonFolderName ?? '-'}
                    </span>
                  </MobileFolderInfo>

                  <ListCell isDisabled={isPending}>
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
