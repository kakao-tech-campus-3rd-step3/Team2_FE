import styled from '@emotion/styled';

import { GraduationCap } from 'lucide-react';

import { BookOpen } from 'lucide-react';
import { CreditCard } from 'lucide-react';

const ModeCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};

  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  flex: 1;
`;

const CardTitle = styled.h6`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
`;

const ModeSelector = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing12};
  display: flex;
  color: ${({ theme }) => theme.colors.gray.gray7};
  background-color: ${({ theme }) => theme.colors.gray.gray3};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing1};
`;

const ModeButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active, theme }) => active && theme.colors.gray.gray0};
  border-radius: ${({ theme }) => theme.radius.radius2};
  flex: 1;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.gray.gray10};
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
  padding: ${({ theme }) => theme.spacing.spacing1};
`;

type ModeCard = {
  selectedMode: string;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
};

function ModeCard({ selectedMode, setSelectedMode }: ModeCard) {
  return (
    <ModeCardWrapper>
      <CardTitle>학습 모드</CardTitle>
      <ModeSelector>
        <ModeButton active={selectedMode === '시험'} onClick={() => setSelectedMode('시험')}>
          <GraduationCap size={16} />
          시험
        </ModeButton>
        <ModeButton active={selectedMode === '학습'} onClick={() => setSelectedMode('학습')}>
          <BookOpen size={16} />
          학습
        </ModeButton>
        <ModeButton active={selectedMode === '카드'} onClick={() => setSelectedMode('카드')}>
          <CreditCard size={16} />
          카드
        </ModeButton>
      </ModeSelector>
    </ModeCardWrapper>
  );
}

export default ModeCard;
