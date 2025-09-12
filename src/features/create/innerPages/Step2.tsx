import React, { useState, useEffect } from 'react';
import Title from '@/features/create/components/Title';
import SubTitle from '../components/Subtitle';
import styled from '@emotion/styled';

interface Step2Props {
  onValidChange: (isValid: boolean) => void;
}

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 4px;
`;

const SettingInfoBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background.foreground};
  border-radius: ${({ theme }) => theme.radius.radius2};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding: 10px 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const InfoTitle = styled.h3`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.body3Bold.fontSize};
`;

const InfoContent = styled.h4`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  padding: 25px 0px;
`;

const InfoSpan = styled.span`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray6};
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CreateButton = styled.button<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray.gray5 : theme.colors.semantic.primary};
  border-radius: ${({ theme }) => theme.radius.radius1};
  font-size: ${({ theme }) => theme.typography.body2Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray0};
  padding: 5px 10px;
  font-weight: ${({ theme }) => theme.typography.body2Bold.fontWeight};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const Spacer12 = styled.div`
  height: 12px;
`;

const Spacer20 = styled.div`
  height: 20px;
`;

const infoData = [
  {
    title: '선택된 PDF',
    content: '1개',
    description: '개발자 면접 가이드.pdf',
  },
  {
    title: '문제 개수',
    content: '20문제',
    description: 'PDF 내용으로만',
  },
  {
    title: '문제 유형',
    content: '객관식',
    description: '4지 선다형',
  },
];

const Step2: React.FC<Step2Props> = ({ onValidChange }) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  useEffect(() => {
    onValidChange(!!selectedFileId);
  }, [selectedFileId, onValidChange]);

  // 현재는 다음 페이지가 비활성화되기에 set을 할 필요는 없으나, vercel 배포에서 에러를 내므로 임시로 사용 => 추후 수정 필요
  useEffect(()=>{
    setSelectedFileId(null);
  },[]);

  return (
    <>
      <Title>문제집을 생성합니다</Title>
      <SubTitle>AI가 생성할 맞춤형 문제집을 확인해보세요</SubTitle>
      <Spacer12 />
      <InfoContainer>
        {infoData.map(({ title, content, description }, index) => (
          <SettingInfoBox key={index}>
            <InfoTitle>{title}</InfoTitle>
            <InfoContent>{content}</InfoContent>
            <InfoSpan>{description}</InfoSpan>
          </SettingInfoBox>
        ))}
      </InfoContainer>
      <Spacer20 />
      <CreateButtonContainer>
        <CreateButton>문제 생성</CreateButton>
      </CreateButtonContainer>
    </>
  );
};

export default Step2;
