import styled from '@emotion/styled';
import WrongNoteListItem from './WrongNoteListItem';
import type { WrongNoteSet } from '@/features/wrong/types/wrongNote';

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

type WrongNoteTableProps = {
  questionSets?: WrongNoteSet[];
};

function WrongNoteTable({ questionSets }: WrongNoteTableProps) {
  return (
    <WrongNoteList>
      <WrongNoteListHeader>
        <WrongNoteListHeaderColumn>문제집</WrongNoteListHeaderColumn>
        <WrongNoteListHeaderColumn>오답 수</WrongNoteListHeaderColumn>
        <WrongNoteListHeaderColumn>유형</WrongNoteListHeaderColumn>
        <WrongNoteListHeaderColumn>오답노트</WrongNoteListHeaderColumn>
      </WrongNoteListHeader>
      {questionSets?.map((item) => (
        <WrongNoteListItem key={item.questionSetId} item={item} />
      ))}
    </WrongNoteList>
  );
}

export default WrongNoteTable;
