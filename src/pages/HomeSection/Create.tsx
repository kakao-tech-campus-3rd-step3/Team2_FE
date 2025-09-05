import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';
import { useState } from 'react';
import styled from '@emotion/styled';

import PdfFileList from '@/features/create/components/PdfFileList';
import NavigationButtons from '@/features/create/components/NavigationButtons';

const Container = styled.div`
  width: 100%;
  min-height: 100dvh;
  background-color: #f5f5f5ff;
  display: flex;
  justify-content: center;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: #f5f5f5ff;
`;

const Title = styled.h2`
  width: 100%;
  font-size: 1.125rem;
  text-align: center;
  padding: 10px;
`;

const SubTitle = styled.span`
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  color: grey;
`;

const Spacer12 = styled.div`
  height: 12px;
`;

const stepLabels = ['PDF 선택', '설정', '생성하기'];
const progress = 5;

const Create = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const mockFileList = Array(8).fill({
    name: '컴퓨터 네트워크.pdf',
    size: '2.4 MB',
    pages: '156p',
    date: '2024. 2. 13.',
  });

  return (
    <Container>
      <ContentBox>
        <CommonProgress progress={progress} stepLabels={stepLabels} width="100%" />
        <Title>PDF 파일을 선택하세요</Title>
        <SubTitle>
          하단의 PDF에서 선택하거나 새로운 PDF를 업로드 해 선택한 후 다음단계로 진행하세요
        </SubTitle>
        <Spacer12 />
        <PdfFileList
          fileList={mockFileList}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
        <NavigationButtons />
      </ContentBox>
    </Container>
  );
};

export default Create;
