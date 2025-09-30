import React, { useEffect } from 'react';
import Title from '@/features/create/components/Title';
import StyledSubTitle from '@/features/create/components/Subtitle';
import styled from '@emotion/styled';
import Spacer from '@/shared/components/Spacer';

interface CreateSummaryProps {
  onValidChange: (isValid: boolean) => void;
  selectedFile: { id: string; name: string | null } | null;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT' | null;
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
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CreateSummary: React.FC<CreateSummaryProps> = ({
  onValidChange,
  selectedFile,
  questionType,
}) => {
  useEffect(() => {
    onValidChange(true);
  }, []);

  const questionTypeDetails = {
    MULTIPLE_CHOICE: { content: '객관식', description: '4지 선다형' },
    TRUE_FALSE: { content: '참/거짓', description: '참 또는 거짓 중 선택' },
    SHORT: { content: '단답형', description: '짧은 답변 직접 작성' },
  };

  const selectedTypeDetails = questionType
    ? questionTypeDetails[questionType]
    : { content: '미선택', description: '문제 유형을 선택해주세요.' };

  const infoData = [
    {
      title: '선택된 PDF',
      content: '1개',
      description: selectedFile?.name ?? '선택된 파일이 없습니다.',
    },
    { title: '문제 개수', content: '10문제', description: 'PDF 내용으로만' },
    {
      title: '문제 유형',
      content: selectedTypeDetails.content,
      description: selectedTypeDetails.description,
    },
  ];

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
    </>
  );
};

export default CreateSummary;
