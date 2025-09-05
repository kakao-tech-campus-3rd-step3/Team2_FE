import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';
import styled from '@emotion/styled';
import { LucideFileText } from 'lucide-react';
import { useState } from 'react';

const stepLabels = ['PDF 선택', '설정', '생성하기'];
const progress = 5;

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
const FileListBox = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid lightgrey;
  width: 100%;
  padding: 10px 15px;
`;
const FileListFirstBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FileListBoxTitle = styled.span`
  font-size: 0.775rem;
  color: grey;
`;
const FileUploadButton = styled.button`
  background-color: #16a34a;
  border-radius: 5px;
  font-size: 0.775rem;
  color: white;
  width: 55px;
  padding: 5px;
  font-weight: bold;
`;

const FileListSecondBox = styled.div`
  width: 100%;
`;

const FileListSearchInput = styled.input`
  border: 1px solid lightgrey;
  padding: 5px;
  width: 100%;
  font-size: 0.75rem;
  border-radius: 6px;
`;
const FileListDivWithScroll = styled.div`
  overflow: auto;
  width: 100%;
  height: 200px;
  border-radius: 5px;
`;
const FileContentBox = styled.div<{ isSelected: boolean }>`
  width: 100%;
  border-radius: 5px;
  border: 1px solid lightgrey;
  height: 50px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#d1fae5' : '#ffffff')}; // ✅ 연두색 배경
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const RadioInput = styled.input`
  width: 10px;
  height: 10px;
`;
const FileIcon = styled(LucideFileText)`
  margin: 10px;
`;
const FileInfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const FileInfoUnderBox = styled.div`
  width: 100%;
  display: flex;
`;
const FileName = styled.h4`
  font-size: 0.85rem;
`;
const FileInfo = styled.span`
  font-size: 0.7rem;
  color: grey;
`;
const Spacer12 = styled.div`
  height: 12px;
`;
const Hr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: lightgrey;
  border: none;
  margin: 16px 0;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PrevButton = styled.button`
  background-color: transparent;
  border: 1px solid lightgrey;
  border-radius: 5px;
  font-size: 0.775rem;
  color: grey;
  width: 55px;
  padding: 5px;
  font-weight: bold;
`;
const NextButton = styled.button`
  background-color: #16a34a;
  border-radius: 5px;
  font-size: 0.775rem;
  color: white;
  width: 55px;
  padding: 5px;
  font-weight: bold;
`;

const Create = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // ✅ 선택 상태

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const mockFileList = Array(8).fill({
    name: '개발자 면접 가이드.pdf',
    size: '2.4 MB',
    pages: '156p',
    date: '2024. 2. 13.',
  });

  return (
    <Container>
      <ContentBox>
        <CommonProgress progress={progress} stepLabels={stepLabels} width={'100%'} />
        <Title>PDF 파일을 선택하세요</Title>
        <SubTitle>
          하단의 PDF에서 선택하거나 새로운 PDF를 업로드 해 선택한 후 다음단계로 진행하세요
        </SubTitle>
        <Spacer12 />
        <FileListBox>
          <FileListFirstBox>
            <FileListBoxTitle>PDF 파일을 선택해주세요.</FileListBoxTitle>
            <FileUploadButton>업로드</FileUploadButton>
          </FileListFirstBox>
          <Spacer12 />
          <FileListSecondBox>
            <FileListSearchInput placeholder="PDF 파일 검색" />
            <Spacer12 />
            <FileListDivWithScroll>
              {mockFileList.map((file, index) => (
                <FileContentBox
                  key={index}
                  isSelected={selectedIndex === index}
                  onClick={() => handleSelect(index)}
                >
                  <RadioInput
                    type="radio"
                    name="pdf-selection"
                    checked={selectedIndex === index}
                    readOnly
                  />
                  <FileIcon size={16} color="#16a34a" />
                  <FileInfoBox>
                    <FileName>{file.name}</FileName>
                    <FileInfoUnderBox>
                      <FileInfo>{file.size}</FileInfo>
                      <FileInfo>&nbsp;·&nbsp;</FileInfo>
                      <FileInfo>{file.pages}</FileInfo>
                      <FileInfo>&nbsp;·&nbsp;</FileInfo>
                      <FileInfo>{file.date}</FileInfo>
                    </FileInfoUnderBox>
                  </FileInfoBox>
                </FileContentBox>
              ))}
            </FileListDivWithScroll>
          </FileListSecondBox>
        </FileListBox>
        <Hr />
        <ButtonBox>
          <PrevButton>이전</PrevButton>
          <NextButton>다음</NextButton>
        </ButtonBox>
      </ContentBox>
    </Container>
  );
};

export default Create;
