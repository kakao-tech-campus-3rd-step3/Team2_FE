import styled from '@emotion/styled';
import { BookOpen } from 'lucide-react';
// import type { WrongNoteSetResponse } from '@/features/wrong/types/wrongNote';
import { useNavigate } from 'react-router-dom';
const WrongNoteListItemWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray5};
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  justify-content: space-between;
  align-items: center;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
  align-items: center;
`;

const WrongNoteInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ theme }) => theme.colors.green.green2};
`;

const WrongNoteInfoTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;

const WrongNoteTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
`;

const WrongNoteFileName = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

const WrongCount = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

const DifficultyLevel = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
  background-color: ${({ theme }) => theme.colors.red.red0};
  color: ${({ theme }) => theme.colors.red.red3};
  border-radius: ${({ theme }) => theme.radius.radius2};
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.spacing1} ${({ theme }) => theme.spacing.spacing2};
`;

const CategoryType = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
  background-color: ${({ theme }) => theme.colors.blue.blue0};
  color: ${({ theme }) => theme.colors.blue.blue2};
  border-radius: ${({ theme }) => theme.radius.radius2};
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.spacing1} ${({ theme }) => theme.spacing.spacing2};
`;

const RetryBtn = styled.button`
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Bold.lineHeight};
  background-color: ${({ theme }) => theme.colors.semantic.primary};
  padding: ${({ theme }) => theme.spacing.spacing2} ${({ theme }) => theme.spacing.spacing5};
  color: ${({ theme }) => theme.colors.gray.gray0};
  border-radius: ${({ theme }) => theme.radius.radius2};
  width: fit-content;
`;

interface WrongNoteListItemProps {
  item: WrongNoteSet;
}

interface WrongNoteSet {
  questionSetId: number;
  questionSetTitle: string;
  sourceNames: string[];
  difficulty: string;
  majorTopic: string;
  incorrectCount: number;
}

function WrongNoteListItem({ item }: WrongNoteListItemProps) {
  // TODO: 여기에 몇번 오답문제지인지도 넘겨줘서 해야함
  const navigate = useNavigate();

  const handleReviewNavigate = () => {
    navigate(`/solve/${item.questionSetId}?isReviewing=true`);
  };

  return (
    <WrongNoteListItemWrapper>
      <WrongNoteInfoWrapper>
        <IconWrapper>
          <BookOpen color="green" size={16} />
        </IconWrapper>
        <WrongNoteInfoTitleWrapper>
          <WrongNoteTitle>{item.questionSetTitle}</WrongNoteTitle>
          <WrongNoteFileName>{item.sourceNames[0]}</WrongNoteFileName>
        </WrongNoteInfoTitleWrapper>
      </WrongNoteInfoWrapper>
      <WrongCount>{item.incorrectCount}개</WrongCount>
      <DifficultyLevel>{item.difficulty}</DifficultyLevel>
      <CategoryType>{'수학'}</CategoryType>
      <RetryBtn onClick={handleReviewNavigate}>복습하기</RetryBtn>
    </WrongNoteListItemWrapper>
  );
}

export default WrongNoteListItem;
