import type { Dispatch, SetStateAction } from 'react';
import { FileEdit, Folder, Pencil, Trash2 } from 'lucide-react';
import styled from '@emotion/styled';

import RightClickMenu from '@/features/library/components/RightClickMenu/RightClickMenu';
import RightClickMenuDivider from '@/features/library/components/RightClickMenu/RightClickMenuDivider';
import RightClickMenuItem from '@/features/library/components/RightClickMenu/RightClickMenuItem';
import type { QuestionSetContentType } from '@/features/library/types/questionSetResponse';
import type { Folder as FolderRes } from '@/shared/components/FolderList';

interface LibraryContextMenuProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  point: { x: number; y: number };
  selectedCell: QuestionSetContentType | null;
  folders?: FolderRes[];
  selectedFolderId: number | null;
  onRename: () => void;
  onDelete: () => void;
  onSolve: () => void;
  onMove: (folderId: number) => void;
}

const LibraryContextMenu = ({
  isVisible,
  setIsVisible,
  point,
  selectedCell,
  folders,
  selectedFolderId,
  onRename,
  onDelete,
  onSolve,
  onMove,
}: LibraryContextMenuProps) => {
  const isSelectedCellPending = selectedCell?.status === 'PENDING';
  const selectedFolderName = folders?.find((folder) => folder.id === selectedFolderId)?.name ?? '';

  return (
    <RightClickMenu isVisible={isVisible} setIsVisible={setIsVisible} point={point}>
      <RightClickMenuItem icon={Pencil} onClick={onRename} disabled={isSelectedCellPending}>
        문제집 이름 변경
      </RightClickMenuItem>
      <RightClickMenuItem icon={Trash2} onClick={onDelete} disabled={isSelectedCellPending}>
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
                onChange={(event) => {
                  if (!selectedCell) return;
                  const targetFolderId = Number(event.target.value);
                  if (targetFolderId !== selectedCell.commonFolderId) {
                    onMove(targetFolderId);
                  }
                }}
                onClick={(event) => event.stopPropagation()}
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
      <RightClickMenuItem icon={FileEdit} onClick={onSolve} disabled={isSelectedCellPending}>
        문제집 풀기
      </RightClickMenuItem>
    </RightClickMenu>
  );
};

export default LibraryContextMenu;

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
