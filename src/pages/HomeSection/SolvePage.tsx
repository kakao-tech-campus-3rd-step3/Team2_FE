import { useState } from 'react';
import styled from '@emotion/styled';
import { GraduationCap } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';

const SolvePageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
`;

const SolvePageInner = styled.div`
  width: 900px;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
`;

const SolveHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
`;

const BackBtnTitleWrapper = styled.div`
  display: flex;
`;

const SolveHeaderBackBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing1};
  color: ${({ theme }) => theme.colors.gray.gray10};

  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

  color: ${({ theme }) => theme.colors.gray.gray10};
  display: flex;
  align-items: center;
`;

const SolveHeaderBackBtnTxt = styled.span`
  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;

const TitleDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.spacing4};
`;

const SolveTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
`;

const SolveDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
`;

const QuestionIndexViewWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray.gray7};
`;
const QuestionIndexViewTxt = styled.span`
  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;

const ProgressDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressDescriptionTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

const ProgressDescriptionPercentTxt = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

const QuestionNavigator = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};
`;

const QuestionNavigatorTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray10};
`;

const QuestionNumberList = styled.div`
  display: flex;
`;

const QuestionNumberItem = styled.div<{ active?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radius.radiusFull};
  margin: ${({ theme }) => theme.spacing.spacing1};
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

  background-color: ${({ active, theme }) =>
    active ? theme.colors.green.green6 : theme.colors.gray.gray3};
  color: ${({ active, theme }) => (active ? theme.colors.gray.gray0 : theme.colors.gray.gray7)};
`;

const SolveContentWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing3};
  display: flex;
`;

const QuestionArea = styled.div`
  margin-right: ${({ theme }) => theme.spacing.spacing3};
  flex: 3;

  background-color: ${({ theme }) => theme.colors.gray.gray0};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};
`;

const QuestionAreaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.spacing10};
`;

const QuestionAreaTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
`;

const QuestionWrapper = styled.div``;

const QuestionStem = styled.p`
  margin: ${({ theme }) => theme.spacing.spacing8} 0;
`;

const OptionList = styled.p``;

const OptionItem = styled.p``;

const QuestionNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
`;

const PrevButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing2};

  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

  color: ${({ theme }) => theme.colors.gray.gray10};
  display: flex;
  align-items: center;
`;

const NextButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing2};

  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

  background-color: ${({ theme }) => theme.colors.green.green6};
  color: ${({ theme }) => theme.colors.gray.gray0};
  display: flex;
  align-items: center;
`;
const RightSidebar = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray.gray0};
`;

interface Question {
  id: number;
  stem: string;
  options: string[];
  answer: number; // 정답 인덱스 (1-based)
}

const questions: Question[] = [
  {
    id: 1,
    stem: '다음 중 데이터 분석의 첫 단계는 무엇입니까?',
    options: ['데이터 수집', '데이터 전처리', '데이터 시각화', '데이터 모델링'],
    answer: 1,
  },
  {
    id: 2,
    stem: '통계에서 평균을 나타내는 용어는 무엇입니까?',
    options: ['Mean', 'Median', 'Mode', 'Variance'],
    answer: 1,
  },
  {
    id: 3,
    stem: '머신러닝에서 과적합(Overfitting)을 방지하는 방법은?',
    options: ['Dropout', 'Batch Normalization', 'Regularization', '모두 해당'],
    answer: 4,
  },
  {
    id: 4,
    stem: 'HTTP 프로토콜에서 GET 요청의 특징은?',
    options: ['데이터 조회', '데이터 생성', '데이터 수정', '데이터 삭제'],
    answer: 1,
  },
  {
    id: 5,
    stem: '다음 중 NoSQL 데이터베이스가 아닌 것은?',
    options: ['MongoDB', 'Redis', 'PostgreSQL', 'Cassandra'],
    answer: 3,
  },
  {
    id: 6,
    stem: 'React의 상태 관리 훅은?',
    options: ['useState', 'useMemo', 'useEffect', 'useCallback'],
    answer: 1,
  },
  {
    id: 7,
    stem: 'CSS에서 Flexbox의 주축을 설정하는 속성은?',
    options: ['align-items', 'justify-content', 'flex-direction', 'flex-wrap'],
    answer: 3,
  },
  {
    id: 8,
    stem: '데이터베이스에서 기본 키(Primary Key)의 역할은?',
    options: ['중복 허용', '유일성 보장', 'NULL 값 허용', '인덱스 생성 불가'],
    answer: 2,
  },
  {
    id: 9,
    stem: '다음 중 파이썬의 데이터 타입이 아닌 것은?',
    options: ['list', 'tuple', 'map', 'set'],
    answer: 3,
  },
  {
    id: 10,
    stem: 'Git에서 새로운 브랜치를 만드는 명령어는?',
    options: ['git checkout', 'git merge', 'git branch', 'git commit -b'],
    answer: 3,
  },
];

function SolvePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);

  const goPrev = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goNext = () => {
    if (currentQuestionIndex < 10) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  return (
    <SolvePageWrapper>
      <SolvePageInner>
        <SolveHeader>
          <BackBtnTitleWrapper>
            <SolveHeaderBackBtn>
              <ArrowLeft size={20} />
              <SolveHeaderBackBtnTxt>돌아가기</SolveHeaderBackBtnTxt>
            </SolveHeaderBackBtn>
            <TitleDescriptionWrapper>
              <SolveTitle>데이터 분석 기초.pdf</SolveTitle>
              <SolveDescription>객관식 20문제</SolveDescription>
            </TitleDescriptionWrapper>
          </BackBtnTitleWrapper>
          <QuestionIndexViewWrapper>
            <GraduationCap size={16} />
            <QuestionIndexViewTxt>{currentQuestionIndex}/10</QuestionIndexViewTxt>
          </QuestionIndexViewWrapper>
        </SolveHeader>
        <ProgressDescriptionWrapper>
          <ProgressDescriptionTitle>진행상황</ProgressDescriptionTitle>
          <ProgressDescriptionPercentTxt>
            {(currentQuestionIndex / 10) * 100}%
          </ProgressDescriptionPercentTxt>
        </ProgressDescriptionWrapper>
        <CommonProgress
          progress={(currentQuestionIndex / 10) * 100}
          stepLabels={[]}
        ></CommonProgress>
        <QuestionNavigator>
          <QuestionNavigatorTitle>문제 바로가기</QuestionNavigatorTitle>
          <QuestionNumberList>
            {/* 이부분 나중에 api나오면 map으로 동적으로 그리게 할거임 */}
            {/* 아님 걍 state 값으로 map돌릴까? */}
            {Array.from({ length: 10 }, (_, i) => (
              <QuestionNumberItem
                key={i + 1}
                active={i + 1 === currentQuestionIndex}
                onClick={() => setCurrentQuestionIndex(i + 1)}
              >
                {i + 1}
              </QuestionNumberItem>
            ))}
          </QuestionNumberList>
        </QuestionNavigator>
        <SolveContentWrapper>
          <QuestionArea>
            <QuestionAreaHeader>
              <QuestionAreaTitle>문제 {currentQuestionIndex}</QuestionAreaTitle>
            </QuestionAreaHeader>
            <QuestionWrapper>
              <QuestionStem>{questions[currentQuestionIndex - 1].stem}</QuestionStem>
              <OptionList>
                {questions[currentQuestionIndex - 1].options.map((opt, i) => (
                  <OptionItem key={i}>{`${i + 1}. ${opt}`}</OptionItem>
                ))}
              </OptionList>

              <QuestionNavigation>
                <PrevButton onClick={goPrev} disabled={currentQuestionIndex === 1}>
                  <ArrowLeft size={20} />
                  이전
                </PrevButton>
                <NextButton onClick={goNext} disabled={currentQuestionIndex === 10}>
                  다음
                  <ArrowRight size={20} />
                </NextButton>
              </QuestionNavigation>
            </QuestionWrapper>
          </QuestionArea>
          <RightSidebar></RightSidebar>
        </SolveContentWrapper>
      </SolvePageInner>
    </SolvePageWrapper>
  );
}

export default SolvePage;
