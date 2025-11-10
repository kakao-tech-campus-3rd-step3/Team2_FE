import type { DragEvent, MouseEvent as ReactMouseEvent, TouchEvent } from 'react';
import { Check, X } from 'lucide-react';
import styled from '@emotion/styled';

import {
  type LearningStatus,
  type QuestionSetContentType,
  type QuestionType,
} from '@/features/library/types/questionSetResponse';
import { getFolderColor } from '@/shared/constants/folderColors';

export interface QuestionSetListProps {
  questionSets: QuestionSetContentType[];
  draggedItem: QuestionSetContentType | null;
  onDragStart: (event: DragEvent<HTMLDivElement>, item: QuestionSetContentType) => void;
  onDragEnd: () => void;
  onContextMenu: (
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
    item: QuestionSetContentType,
  ) => void;
  onTouchStart: (event: TouchEvent<HTMLDivElement>, item: QuestionSetContentType) => void;
  onTouchEnd: () => void;
  onTouchMove: () => void;
  editingItemId: number | null;
  editingTitle: string;
  onEditingTitleChange: (value: string) => void;
  onSubmitTitleEdit: (item: QuestionSetContentType) => void;
  onCancelTitleEdit: () => void;
  onSolve: (questionSetId: number) => void;
}

const LEARNING_STATUS_TEXT: Record<LearningStatus, string> = {
  NOT_STARTED: '학습 전',
  IN_PROGRESS: '학습 중',
  COMPLETED: '학습 완료',
};

const LEARNING_STATUS_STYLES: Record<LearningStatus, { background: string; color: string }> = {
  NOT_STARTED: { background: '#f3f4f6', color: '#4b5563' },
  IN_PROGRESS: { background: '#fffbeb', color: '#d97706' },
  COMPLETED: { background: '#ecfdf5', color: '#059669' },
};

const TYPE_MAP: Record<QuestionType, string> = {
  MULTIPLE_CHOICE: '객관식',
  SHORT_ANSWER: '단답형',
  TRUE_FALSE: '참/거짓',
};

const DEFAULT_FOLDER_COLOR = '#d1d5db';

const QuestionSetList = ({
  questionSets,
  draggedItem,
  onDragStart,
  onDragEnd,
  onContextMenu,
  onTouchStart,
  onTouchEnd,
  onTouchMove,
  editingItemId,
  editingTitle,
  onEditingTitleChange,
  onSubmitTitleEdit,
  onCancelTitleEdit,
  onSolve,
}: QuestionSetListProps) => {
  return (
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
      {questionSets.map((item) => {
        const isEditing = editingItemId === item.questionSetId;
        const isPending = item.status === 'PENDING';

        return (
          <ListRow
            key={item.questionSetId}
            draggable={item.status === 'COMPLETE'}
            isDragging={draggedItem?.questionSetId === item.questionSetId}
            isDisabled={isPending}
            onDragStart={(event) => onDragStart(event, item)}
            onDragEnd={onDragEnd}
            onContextMenu={(event) => onContextMenu(event, item)}
            onTouchStart={(event) => onTouchStart(event, item)}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
          >
            <ListCell align="left" isDisabled={isPending}>
              {isEditing ? (
                <TitleContainer>
                  <TitleEditInput
                    value={editingTitle}
                    onChange={(event) => onEditingTitleChange(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        onSubmitTitleEdit(item);
                      }
                      if (event.key === 'Escape') {
                        onCancelTitleEdit();
                      }
                    }}
                    autoFocus
                  />
                  <div>
                    <EditIconButton onClick={() => onSubmitTitleEdit(item)}>
                      <Check size={16} />
                    </EditIconButton>
                    <EditIconButton onClick={onCancelTitleEdit}>
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

            <MobileInfoRow>
              <MobileInfoItem>문제 수: {item.questionCount}개</MobileInfoItem>
              <MobileInfoItem>유형: {TYPE_MAP[item.questionType] ?? '생성 실패'}</MobileInfoItem>
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
                <PrimaryButton onClick={() => onSolve(item.questionSetId)}>풀기</PrimaryButton>
              )}
            </ListCell>
          </ListRow>
        );
      })}
    </ListBox>
  );
};

export default QuestionSetList;

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
      display: none;
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
  justify-content: space-between;
  gap: 8px;
  max-width: 100%;
`;

const TitleTextWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
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
