import styled from '@emotion/styled';
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

  @media (max-width: 1050px), (max-height: 400px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.spacing3};
    padding: ${({ theme }) => theme.spacing.spacing4};
  }
`;

const WrongNoteInfoTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1050px), (max-height: 400px) {
    width: 100%;
  }
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
  color: ${({ theme }) => theme.colors.gray.gray6};
  margin-top: 4px;
`;

const WrongCount = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
  text-align: center;

  @media (max-width: 1050px), (max-height: 400px) {
    text-align: left;
    display: none;
  }
`;

const QuestionSetType = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
  border-radius: ${({ theme }) => theme.radius.radius2};
  text-align: center;

  @media (max-width: 1050px), (max-height: 400px) {
    text-align: left;
    display: none;
  }
`;

const RetryBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1050px), (max-height: 400px) {
    width: 100%;
    justify-content: stretch;
  }
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

  @media (max-width: 1050px), (max-height: 400px) {
    width: 100%;
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
      <MobileInfoRow>
        <MobileInfoItem>오답 수: {item.incorrectCount}개</MobileInfoItem>
        <MobileInfoItem>유형: {displayType}</MobileInfoItem>
      </MobileInfoRow>
      <RetryBtnWrapper>
        <RetryBtn onClick={handleReviewNavigate}>복습하기</RetryBtn>
      </RetryBtnWrapper>
    </WrongNoteListItemWrapper>
  );
}

export default WrongNoteListItem;
