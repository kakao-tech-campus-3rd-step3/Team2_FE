import styled from '@emotion/styled';
import Celebration from '@/features/create/components/Celebration';
import { Play, RefreshCw } from 'lucide-react';
import Spacer from '@/shared/components/Spacer';

interface CompleteProps {
  fileName: string | null;
  onReset: () => void;
}

const NoticeTitle = styled.h3`
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
`;
const NoticeContent = styled.p`
  width: 100%;
  padding: 10px;
  text-align: center;
`;
const NoticeContentHighlight = styled.span`
  color: ${({ theme }) => theme.colors.semantic.primary};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
`;
const CompletedInfo = styled.h4`
  width: 100%;
  text-align: center;
`;
const ButtonBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  gap: 10px;
  height: 70px;
`;
const ReCreateButton = styled.button`
  flex: 1;
  border-radius: ${({ theme }) => theme.radius.radius2};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray5};
  align-items: center;
  justify-content: center;
  &:hover svg {
    transform: rotate(180deg);
  }
`;
const GoSolvingButton = styled.button`
  flex: 1;
  border-radius: ${({ theme }) => theme.radius.radius2};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray5};
  background-color: ${({ theme }) => theme.colors.green.green6};
  transition:
    background-color 0.3s ease,
    filter 0.3s ease;

  &:hover {
    filter: brightness(1.05); /* 살짝 진해짐 */
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const ButtonTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.body3Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body3Bold.fontWeight};
`;
const ButtonSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.body4Regular.fontSize};
  opacity: 0.9;
`;
const PlayIcon = styled(Play)`
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
`;
const RefreshIcon = styled(RefreshCw)`
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.5s ease;
`;
const Complete: React.FC<CompleteProps> = ({ fileName, onReset }) => {
  return (
    <>
      <Spacer height="70px" />
      <Celebration />
      <Spacer height="25px" />
      <NoticeTitle>문제집 생성 완료!</NoticeTitle>
      <NoticeContent>
        AI가 <NoticeContentHighlight>20개</NoticeContentHighlight>의{' '}
        <NoticeContentHighlight>객관식</NoticeContentHighlight> 문제를 완성했어요!
      </NoticeContent>
      <Spacer height="20px" />
      <CompletedInfo>{fileName ?? '선택된 파일 없음'}</CompletedInfo>
      <Spacer height="12px" />
      <ButtonBox>
        <ReCreateButton onClick={onReset}>
          <RefreshIcon />
          <ButtonTitle>다른 문제 만들기</ButtonTitle>
          <ButtonSubtitle>새로운 문제 생성</ButtonSubtitle>
        </ReCreateButton>
        <GoSolvingButton>
          <PlayIcon />
          <ButtonTitle>문제 풀러가기</ButtonTitle>
          <ButtonSubtitle>바로 학습 시작</ButtonSubtitle>
        </GoSolvingButton>
      </ButtonBox>
    </>
  );
};

export default Complete;
