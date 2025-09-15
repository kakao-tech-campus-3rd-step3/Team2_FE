import styled from '@emotion/styled';
import Spinner from '@/features/create/components/Spinner';
import Spacer from '@/shared/components/Spacer';
import { useEffect, useState } from 'react';
import Complete from '@/features/create/components/Complete';

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

const NextComponent = () => (
  <Container>
    <Complete />
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
