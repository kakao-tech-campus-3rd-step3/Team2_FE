import React, { useEffect } from 'react';
import Title from '@/features/create/components/Title';
import StyledSubTitle from '@/features/create/components/Subtitle';
import styled from '@emotion/styled';
import Spacer from '@/shared/components/Spacer';
import type { QuestionType } from '@/features/create/constants/questionTypeConstants';
import { QUESTION_TYPE_DATA } from '@/features/create/constants/questionTypeConstants';

interface ChooseTypeProps {
  selectedType: QuestionType | null;
  onValidChange: (isValid: boolean) => void;
  onSelectType: (type: QuestionType) => void;
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
  }, [selectedType, onValidChange]);

  const handleSelect = (type: QuestionType) => {
    onSelectType(type);
  };

  return (
    <>
      <Title>문제 유형을 선택하세요</Title>
      <StyledSubTitle>어떤 형태의 문제를 생성할까요</StyledSubTitle>
      <Spacer height="12px" />
      <InfoContainer>
        {QUESTION_TYPE_DATA.map(({ id, title, description, icon: IconComponent }) => {
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
              <InfoContent selected={selected}>{description}</InfoContent>
            </RadioCard>
          );
        })}
      </InfoContainer>
      <Spacer height="20px" />
    </>
  );
};

export default ChooseType;
