import React, { useState, useEffect } from 'react';
import Title from '@/features/create/components/Title';
import StyledSubTitle from '@/features/create/components/Subtitle';
import styled from '@emotion/styled';
import Spacer from '@/shared/components/Spacer';

interface Step2Props {
  onValidChange: (isValid: boolean) => void;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
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

const Step2: React.FC<Step2Props> = ({ onValidChange, setSelectedMenu }) => {
  // 페이지 추가 시 추후 수정 필요
  useEffect(() => {
    onValidChange(false);
  }, []);

  return (
    <>
      <Title>문제집을 생성합니다</Title>
      <StyledSubTitle>AI가 생성할 맞춤형 문제집을 확인해보세요</StyledSubTitle>
      <Spacer height="12px" />
      <InfoContainer>
        {infoData.map(({ title, content, description }, index) => (
          <SettingInfoBox key={index}>
            <InfoTitle>{title}</InfoTitle>
            <InfoContent>{content}</InfoContent>
            <InfoSpan>{description}</InfoSpan>
          </SettingInfoBox>
        ))}
      </InfoContainer>
      <Spacer height="20px" />
      <CreateButtonContainer>
        <CreateButton onClick={() => setSelectedMenu('문제풀이')}>문제 생성</CreateButton>
      </CreateButtonContainer>
    </>
  );
};

export default Step2;
