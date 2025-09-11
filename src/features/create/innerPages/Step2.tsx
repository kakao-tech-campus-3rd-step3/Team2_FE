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
  background-color: #${({ theme }) => theme.colors.background.foreground};
  border-radius: ${({ theme }) => theme.radius.radius2};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding: 10px 15px;
  flex: 1;
`;

const Spacer12 = styled.div`
  height: 12px;
`;

const Step2: React.FC<Step2Props> = ({ onValidChange }) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  useEffect(() => {
    // 예시: selectedFileId가 있으면 유효(true), 없으면 false
    onValidChange(!!selectedFileId);
  }, [selectedFileId, onValidChange]);

  return (
    <>
      <Title>문제집을 생성합니다</Title>
      <SubTitle>AI가 생성할 맞춤형 문제집을 확인해보세요</SubTitle>
      <Spacer12 />
      <InfoContainer>
        <SettingInfoBox>a</SettingInfoBox>
        <SettingInfoBox>b</SettingInfoBox>
        <SettingInfoBox>c</SettingInfoBox>
      </InfoContainer>
    </>
  );
};

export default Step2;
