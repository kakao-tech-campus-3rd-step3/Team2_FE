import styled from '@emotion/styled';
import { FileText, Target, BarChart3 } from 'lucide-react';

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div``;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.gray.gray10};
  margin: ${({ theme }) => theme.spacing.spacing0};
`;

const FeatureDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray.gray7};
  margin: 0.25rem 0 0 0;
`;

const features = [
  {
    icon: <FileText size={24} color="#10b981" />,
    title: '스마트 PDF 분석',
    description: 'AI가 자동으로 핵심 개념을 추출하고 문제를 생성합니다',
  },
  {
    icon: <Target size={24} color="#10b981" />,
    title: '맞춤형 문제 생성',
    description: '난이도와 문제 유형을 선택해 최적화된 학습을 경험하세요',
  },
  {
    icon: <BarChart3 size={24} color="#10b981" />,
    title: '학습 분석 리포트',
    description: '성취도와 약점을 분석해 효율적인 복습 계획을 제시합니다',
  },
];

const FeatureList = () => (
  <FeatureGrid>
    {features.map((feature, index) => (
      <FeatureItem key={index}>
        <IconWrapper>{feature.icon}</IconWrapper>
        <TextWrapper>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <FeatureDescription>{feature.description}</FeatureDescription>
        </TextWrapper>
      </FeatureItem>
    ))}
  </FeatureGrid>
);

export default FeatureList;
