import { useState } from 'react';
import styled from '@emotion/styled';

import PdfFileList from '@/features/create/components/PdfFileList';
import type { FileData } from '@/features/create/types/types';

const Title = styled.h2`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  text-align: center;
  padding: 10px;
`;

const SubTitle = styled.span`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  text-align: center;
  color: ${({ theme }) => theme.colors.gray.gray6};
`;

const Spacer12 = styled.div`
  height: 12px;
`;

const Step1 = () => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const mockFileList: FileData[] = Array.from({ length: 8 }, (_, idx) => ({
    id: `file-${idx}`, // 지금은 파일명이 같긴 하지만, 선택 시에 구분이 되어야 하므로 mock에서는 인덱스를 참조함
    name: '컴퓨터 네트워크.pdf',
    size: '2.4 MB',
    pages: '156p',
    date: '2024. 2. 13.',
  }));

  return (
    <>
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
    </>
  );
};

export default Step1;
