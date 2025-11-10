import styled from '@emotion/styled';
import { useState, useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/shared/api/axiosClient';
import RightClickMenu from '@/features/library/components/RightClickMenu/RightClickMenu';
import RightClickMenuItem from '@/features/library/components/RightClickMenu/RightClickMenuItem';
import { type QuestionSetContentType } from '@/features/library/types/questionSetResponse';
import { Check, FolderIcon, Pencil, Plus, Trash2, X } from 'lucide-react';
import { getFolderColor } from '@/shared/constants/folderColors';

// 폴더 이름 글자수 제한
const MAX_LENGTH = 20;

export interface Folder {
  id: number;
  name: string;
  type: 'QUESTION_SET';
  scope: 'ALL' | 'CUSTOM';
  sortOrder: number;
}

interface FolderListProps {
  folders: Folder[] | undefined;
  selectedFolderId: number | null;
  onFolderSelect: (id: number) => void;
  draggedItem: QuestionSetContentType | null;
  onItemDrop: (folderId: number, questionSetId: number) => void;
  rightClickDisabled?: boolean;
  addFolderDisabled?: boolean;
}

const QUESTION_SET_TYPE = 'QUESTION_SET';
const ALL_FOLDER_ID = 1;

const FolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

// 폴더 선택시 강조되는 부분 -FolderTag
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
  background-color: ${({ isDragOver, folderColor, folderHoverColor }) =>
    isDragOver ? folderHoverColor : folderColor};
  border: 1px solid transparent;
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
  color: white;
  cursor: pointer;
  user-select: none;
  font-weight: ${({ isActive }) => (isActive ? '700' : '500')};
  transition:
    background-color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.1s;

  /* 선택 시 스타일 강조 */
  ${({ isActive, folderHoverColor }) =>
    isActive &&
    `
      background-color: ${folderHoverColor};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
      filter: brightness(1.1);
      transform: none;
  `}

  &:hover {
    background-color: ${({ folderHoverColor }) => folderHoverColor};
    border-color: ${({ folderHoverColor }) => folderHoverColor};
    color: white;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
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

const FolderList = ({
  folders,
  selectedFolderId,
  onFolderSelect,
  draggedItem,
  onItemDrop,
  rightClickDisabled,
  addFolderDisabled,
}: FolderListProps) => {
  const [dragOverFolderId, setDragOverFolderId] = useState<number | null>(null);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isVisibleFolderMenu, setIsVisibleFolderMenu] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [editingFolderName, setEditingFolderName] = useState('');
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const addInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const [folderMousePoint, setFolderMousePoint] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const queryClient = useQueryClient();

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

  // 모바일 길게 누르기 이벤트 핸들러
  const handleFolderTouchStart = (e: React.TouchEvent<HTMLDivElement>, folder: Folder) => {
    const touch = e.touches[0];
    const timer = setTimeout(() => {
      setSelectedFolder(folder);
      setIsVisibleFolderMenu(true);
      setFolderMousePoint({ x: touch.clientX, y: touch.clientY });
    }, 500); // 500ms 길게 누르기
    setLongPressTimer(timer);
  };

  const handleFolderTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleFolderTouchMove = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

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
        onFolderSelect(ALL_FOLDER_ID);
      }
    },
    onError: (error) => {
      alert(`폴더 삭제 중 에러가 발생했습니다: ${error.message}`);
    },
  });

  const updateFolderNameMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => {
      const trimmedName = name.trim();
      if (!trimmedName) {
        throw new Error('폴더 이름은 비워둘 수 없습니다.');
      }

      if (trimmedName.length > MAX_LENGTH) {
        throw new Error(`폴더 이름은 ${MAX_LENGTH}자 이내여야 합니다.`);
      }

      return api.patch(`/common-folders/${id}`, {
        name: trimmedName,
        type: QUESTION_SET_TYPE,
      });
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

    onItemDrop(folder.id, draggedItem.questionSetId);
  };

  const handleAddFolder = () => {
    setIsAddingFolder(true);
  };

  const handleCancelAddFolder = () => {
    setIsAddingFolder(false);
    setNewFolderName('');
  };

  const handleConfirmAddFolder = () => {
    const trimmedName = newFolderName.trim();
    if (!newFolderName.trim()) {
      alert('폴더 이름을 입력해주세요.');
      return;
    }
    if (trimmedName.length > MAX_LENGTH) {
      alert(`폴더 이름은 ${MAX_LENGTH}자 이내로 입력해주세요.`);
      return;
    }
    createFolderMutation.mutate(newFolderName.trim());
  };

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
      const confirmMessage = `'${selectedFolder.name}' 폴더를 정말 삭제하시겠습니까?`;

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

  const isDisabled = selectedFolder?.scope === 'ALL';

  return (
    <>
      {!rightClickDisabled && (
        <RightClickMenu
          isVisible={isVisibleFolderMenu}
          setIsVisible={setIsVisibleFolderMenu}
          point={folderMousePoint}
        >
          <RightClickMenuItem icon={Pencil} onClick={handleFolderMenuRename} disabled={isDisabled}>
            폴더 이름 변경
          </RightClickMenuItem>
          <RightClickMenuItem icon={Trash2} onClick={handleFolderMenuDelete} disabled={isDisabled}>
            폴더 삭제
          </RightClickMenuItem>
        </RightClickMenu>
      )}
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
                onClick={() => onFolderSelect(folder.id)}
                onContextMenu={(e) => handleFolderContextMenu(e, folder)}
                onTouchStart={(e) => handleFolderTouchStart(e, folder)}
                onTouchEnd={handleFolderTouchEnd}
                onTouchMove={handleFolderTouchMove}
                onDragOver={(e) => handleDragOver(e, folder.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, folder)}
              >
                {isEditingThisFolder ? (
                  <>
                    {' '}
                    <FolderInput
                      ref={addInputRef}
                      value={editingFolderName}
                      onChange={(e) => {
                        const newName = e.target.value;
                        if (newName.length > MAX_LENGTH) {
                          alert(`폴더 이름은 ${MAX_LENGTH}자 이내로 입력해주세요.`);
                          setTimeout(() => {
                            addInputRef.current?.focus();
                          }, 0);
                        } else {
                          setEditingFolderName(newName);
                        }
                      }}
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
                      <Check size={16} />
                    </FolderActionButton>
                    <FolderActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingFolderId(null);
                      }}
                    >
                      <X size={16} />
                    </FolderActionButton>
                  </>
                ) : (
                  <>{folder.name}</>
                )}
              </FolderTag>
            );
          })}
        {isAddingFolder ? (
          <FolderInputContainer>
            <FolderIcon size={16} />
            <FolderInput
              ref={editInputRef}
              value={newFolderName}
              onChange={(e) => {
                const newName = e.target.value;
                if (newName.length > MAX_LENGTH) {
                  alert(`폴더 이름은 ${MAX_LENGTH}자 이내로 입력해주세요.`);
                  setTimeout(() => {
                    editInputRef.current?.focus();
                  }, 0);
                } else {
                  setNewFolderName(newName);
                }
              }}
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
            <FolderActionButton onClick={handleConfirmAddFolder}>
              <Check size={16} />
            </FolderActionButton>
            <FolderActionButton onClick={handleCancelAddFolder}>
              <X size={16} />
            </FolderActionButton>
          </FolderInputContainer>
        ) : (
          !addFolderDisabled && (
            <AddFolderButton onClick={handleAddFolder}>
              <Plus size={16} />
            </AddFolderButton>
          )
        )}
      </FolderContainer>
    </>
  );
};

export default FolderList;
