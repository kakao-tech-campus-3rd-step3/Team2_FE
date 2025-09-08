import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';
import { useState } from 'react';
import styled from '@emotion/styled';

import PdfFileList from '@/features/create/components/PdfFileList';
import NavigationButtons from '@/features/create/components/NavigationButtons';
import PageLayout from '@/shared/components/Layout/PageLayout';
import type { FileData } from '@/features/create/types/types';

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
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const mockFileList: FileData[] = Array.from({ length: 8 }, (_, idx) => ({
  id: `file-${idx}`, // 지금은 파일명이 같긴 하지만, 선택 시에 구분이 되어야 하므로 mock에서는 인덱스를 참조함
  name: '컴퓨터 네트워크.pdf',
  size: '2.4 MB',
  pages: '156p',
  date: '2024. 2. 13.',
}));

  return (
    <PageLayout>
      <CommonProgress progress={progress} stepLabels={stepLabels} width="100%" />
      <Title>PDF 파일을 선택하세요</Title>
      <SubTitle>
        하단의 PDF에서 선택하거나 새로운 PDF를 업로드 해 선택한 후 다음단계로 진행하세요
      </SubTitle>
      <Spacer12 />
      <PdfFileList
        fileList={mockFileList}
        selectedFileId={selectedFileId}
        onSelect={setSelectedFileId}
      />
      <NavigationButtons />
    </PageLayout>
  );
};

export default Create;
