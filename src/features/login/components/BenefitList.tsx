import styled from '@emotion/styled';
import { CheckCircle } from 'lucide-react';

const BenefitSection = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
`;

const BenefitTitle = styled.h4`
  font-weight: 600;
  color: #111827;
  font-size: 0.925rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  margin-bottom: 5px;
  color: #4b5563;
`;

const Icon = styled(CheckCircle)`
  width: 1rem;
  height: 1rem;
  color: #10b981;
`;

const BenefitList = () => (
  <BenefitSection>
    <BenefitTitle>로그인하면 이런 걸 할 수 있어요</BenefitTitle>
    <div>
      <BenefitItem>
        <Icon />
        PDF 업로드 및 문제 생성
      </BenefitItem>
      <BenefitItem>
        <Icon />
        개인 맞춤형 학습 분석 리포트
      </BenefitItem>
      <BenefitItem>
        <Icon />
        오답노트와 복습 스케줄링
      </BenefitItem>
      <BenefitItem>
        <Icon />
        학습 진도 추적 및 성취도 분석
      </BenefitItem>
    </div>
  </BenefitSection>
);

export default BenefitList;
