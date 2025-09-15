import styled from '@emotion/styled';
import Spinner from '../components/Spinner';
import Spacer from '@/shared/components/Spacer';
import { useEffect, useState } from 'react';
import Celebration from '../components/Celebration';
import { Play } from 'lucide-react';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
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
  border: 1px solid black;
  border-radius: 8px;
`;
const GoSolvingButton = styled.button`
  flex: 1;
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
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
  font-size: 0.875rem;
  font-weight: 600;
`;
const ButtonSubtitle = styled.p`
  font-size: 0.75rem; // text-xs
  opacity: 0.9;
`;
const PlayIcon = styled(Play)`
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
`;
const NextComponent = () => (
  <Container>
    <Spacer height="12px" />
    <Celebration />
    <Spacer height="25px" />
    <NoticeTitle>문제집 생성 완료!</NoticeTitle>
    <NoticeContent>
      AI가 <NoticeContentHighlight>20개</NoticeContentHighlight>의{' '}
      <NoticeContentHighlight>객관식</NoticeContentHighlight> 문제를 완성했어요!
    </NoticeContent>
    <Spacer height="20px" />
    <CompletedInfo> 기계학습 입문 문제집.pdf</CompletedInfo>
    <Spacer height="12px" />
    <ButtonBox>
      <ReCreateButton>다른 문제 만들기</ReCreateButton>
      <GoSolvingButton>
        <PlayIcon />
        <ButtonTitle>문제 풀러가기</ButtonTitle>
        <ButtonSubtitle>바로 학습 시작</ButtonSubtitle>
      </GoSolvingButton>
    </ButtonBox>
  </Container>
);

const CreateRequest = () => {
  const [step, setStep] = useState<'loading' | 'next'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('next'); // 3초 뒤에 next 컴포넌트로 변경
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (step === 'next') {
    return <NextComponent />;
  }

  return (
    <Container>
      <Spinner />
      <Spacer height="25px" />
      <NoticeTitle>AI가 문제를 생성하고 있습니다.</NoticeTitle>
      <NoticeContent>
        선택하신 PDF에서 <NoticeContentHighlight>20개</NoticeContentHighlight>의{' '}
        <NoticeContentHighlight>객관식</NoticeContentHighlight> 문제를 생성하고 있어요
      </NoticeContent>
    </Container>
  );
};

export default CreateRequest;
