import styled from '@emotion/styled';
// import type { WrongNoteSetResponse } from '@/features/wrong/types/wrongNote';
import { useNavigate } from 'react-router-dom';
const WrongNoteListItemWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4} ${({ theme }) => theme.spacing.spacing6};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray5};
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  justify-content: space-between;
  align-items: center;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.gray2};
  }
`;

const WrongNoteInfoTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrongNoteTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
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
  text-align: center;
`;

const QuestionSetType = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
  border-radius: ${({ theme }) => theme.radius.radius2};
  text-align: center;
`;

const RetryBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RetryBtn = styled.button`
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Bold.lineHeight};
  background-color: ${({ theme }) => theme.colors.semantic.primary};
  padding: ${({ theme }) => theme.spacing.spacing2} ${({ theme }) => theme.spacing.spacing5};
  color: ${({ theme }) => theme.colors.gray.gray0};
  border-radius: ${({ theme }) => theme.radius.radius2};
  width: 100px;
  text-align: center;
`;

interface WrongNoteListItemProps {
  item: WrongNoteSet;
}

interface WrongNoteSet {
  questionSetId: number;
  questionSetTitle: string;
  sourceNames?: string[];
  difficulty: string;
  majorTopic: string;
  incorrectCount: number;
  category?: string;
}

function WrongNoteListItem({ item }: WrongNoteListItemProps) {
  const navigate = useNavigate();

  const handleReviewNavigate = () => {
    navigate(`/solve/${item.questionSetId}?isReviewing=true`);
  };

  const TYPE_MAP: Record<string, string> = {
    MULTIPLE_CHOICE: '객관식',
    SHORT_ANSWER: '단답형',
    TRUE_FALSE: '참/거짓',
  };

  const displayType = item.category
    ? (TYPE_MAP[item.category] ?? item.category)
    : (item.majorTopic ?? '전체');

  return (
    <WrongNoteListItemWrapper>
      <WrongNoteInfoTitleWrapper>
        <WrongNoteTitle>{item.questionSetTitle}</WrongNoteTitle>
        <WrongNoteFileName>{item.sourceNames?.[0] ?? ''}</WrongNoteFileName>
      </WrongNoteInfoTitleWrapper>
      <WrongCount>{item.incorrectCount}개</WrongCount>
      <QuestionSetType>{displayType}</QuestionSetType>
      <RetryBtnWrapper>
        <RetryBtn onClick={handleReviewNavigate}>복습하기</RetryBtn>
      </RetryBtnWrapper>
    </WrongNoteListItemWrapper>
  );
}

export default WrongNoteListItem;
