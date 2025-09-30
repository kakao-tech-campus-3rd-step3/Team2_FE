import React, { useEffect } from 'react';
import Title from '@/features/create/components/Title';
import StyledSubTitle from '@/features/create/components/Subtitle';
import styled from '@emotion/styled';
import Spacer from '@/shared/components/Spacer';
import { ListChecks, Binary, PenLine } from 'lucide-react';

interface ChooseTypeProps {
  selectedType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | null;
  onValidChange: (isValid: boolean) => void;
  onSelectType: (type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER') => void;
}

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 12px;
`;

const RadioCard = styled.label<{ selected: boolean }>`
  flex: 1;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.semantic.primary : theme.colors.background.foreground};
  border-radius: ${({ theme }) => theme.radius.radius2};
  border: 2px solid
    ${({ theme, selected }) =>
      selected ? theme.colors.semantic.primary : theme.colors.border.border1};
  padding: 16px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.semantic.primary};
  }
`;

const HiddenRadio = styled.input`
  display: none;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const InfoTitle = styled.h3<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.typography.body3Bold.fontSize};
  color: ${({ theme, selected }) => (selected ? 'white' : theme.colors.text.default)};
`;

const InfoContent = styled.p<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  color: ${({ theme, selected }) => (selected ? 'white' : theme.colors.gray.gray6)};
`;

const ChooseType: React.FC<ChooseTypeProps> = ({ selectedType, onValidChange, onSelectType }) => {
  useEffect(() => {
    onValidChange(!!selectedType);
  }, [selectedType]);

  const handleSelect = (type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER') => {
    onSelectType(type);
  };

  const infoData = [
    {
      id: 'MULTIPLE_CHOICE' as const,
      title: '객관식',
      content: '4개 선택지 중 정답 선택',
      icon: ListChecks,
    },
    {
      id: 'TRUE_FALSE' as const,
      title: '참/거짓',
      content: '참 또는 거짓 중 선택',
      icon: Binary,
    },
    {
      id: 'SHORT_ANSWER' as const,
      title: '단답형',
      content: '짧은 답변 직접 작성',
      icon: PenLine,
    },
  ];

  return (
    <>
      <Title>문제 유형을 선택하세요</Title>
      <StyledSubTitle>어떤 형태의 문제를 생성할까요</StyledSubTitle>
      <Spacer height="12px" />
      <InfoContainer>
        {infoData.map(({ id, title, content, icon: IconComponent }) => {
          const selected = selectedType === id;
          const iconColor = selected ? 'white' : 'currentColor';

          return (
            <RadioCard key={id} selected={selected}>
              <HiddenRadio
                type="radio"
                name="questionType"
                value={id}
                checked={selected}
                onChange={() => handleSelect(id)}
              />
              <TitleContainer>
                <IconComponent size={20} color={iconColor} />
                <InfoTitle selected={selected}>{title}</InfoTitle>
              </TitleContainer>
              <InfoContent selected={selected}>{content}</InfoContent>
            </RadioCard>
          );
        })}
      </InfoContainer>
      <Spacer height="20px" />
    </>
  );
};

export default ChooseType;
