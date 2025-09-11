import { useState } from 'react';
import styled from '@emotion/styled';
import { GraduationCap } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { CreditCard } from 'lucide-react';

import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';

import PageLayout from '@/shared/components/Layout/PageLayout';

import SolveHeader from '@/features/solve/SolveHeader';

const SolveWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing5};

  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 960px;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
`;

// 문제풀이 헤더 부분
// const SolveHeader = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: ${({ theme }) => theme.spacing.spacing5};
// `;

// const BackBtnTitleWrapper = styled.div`
//   display: flex;
// `;

// const SolveHeaderBackBtn = styled.button`
//   border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
//   border-radius: ${({ theme }) => theme.radius.radius2};
//   padding: ${({ theme }) => theme.spacing.spacing1};
//   color: ${({ theme }) => theme.colors.gray.gray10};

//   font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
//   font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
//   line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

//   color: ${({ theme }) => theme.colors.gray.gray10};
//   display: flex;
//   align-items: center;
// `;

// const SolveHeaderBackBtnTxt = styled.span`
//   margin-left: ${({ theme }) => theme.spacing.spacing2};
// `;

// const TitleDescriptionWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: ${({ theme }) => theme.spacing.spacing4};
// `;

// const SolveTitle = styled.h2`
//   font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
//   font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
//   line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
// `;

// const SolveDescription = styled.p`
//   font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
//   font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
//   line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
// `;

// const QuestionIndexViewWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   color: ${({ theme }) => theme.colors.gray.gray7};
// `;
// const QuestionIndexViewTxt = styled.span`
//   margin-left: ${({ theme }) => theme.spacing.spacing2};
// `;


// 프로그래스바 부분
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

// 문제 네비게이터 부분
const QuestionNavigator = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  margin-top: ${({ theme }) => theme.spacing.spacing4};
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

const QuestionNumberItem = styled.div<{ active?: boolean; solved?: boolean }>`
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

  background-color: ${({ active, solved, theme }) =>
    active ? theme.colors.green.green6
    : solved ? theme.colors.green.green7
    : theme.colors.gray.gray3};
  
  color: ${({ active, solved, theme }) =>
    active ? theme.colors.gray.gray0
    : solved ? theme.colors.gray.gray0
    : theme.colors.gray.gray7};
`;

// 문제 푸는 부분 본문 전체
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

const OptionItem = styled.p`
  cursor: pointer;
`;

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
  display: flex;
  flex-direction: column;
`;

const ModeCard = styled.div`
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

const ProgressCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray0};

  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};

  flex: 1;
`;

const ProgressStats = styled.div`
    display: flex;
    flex-direction: column;
`

const ProgressStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`

const ProgressStatLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`

const ProgressStatValue = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`

interface Question {
  id: number;
  stem: string;
  options: string[];
  answer: number; // 정답 인덱스 (1-based)
}

// 문제집 Mock 데이터
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

// Solve
function Solve() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1); // 현재 풀고있는 문제 인덱스
  const [selectedMode, setSelectedMode] = useState<string>('시험'); // 문제 풀이 모드 선택
  const [solvedCheck, setSolvedCheck] = useState<Set<number>>(new Set()); // 선택된 문항 set으로 관리

  // set에 풀린 문제 기록 함수
  const markSolved = (qNo: number) => {
  setSolvedCheck(prev => {
    const next = new Set(prev);
    next.add(qNo);              // qNo 문제를 '완료'로 기록
    return next;
  });
};

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
    <PageLayout>
      <SolveWrapper>

        {/* 문제풀이 페이지 헤더 여기에는 currentQuestionIndex가 쓰이니까 props로 넘겨주자*/}
        <SolveHeader currentQuestionIndex={currentQuestionIndex}>
          {/* <BackBtnTitleWrapper>
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
          </QuestionIndexViewWrapper> */}
        </SolveHeader>

        {/* 프로그레스바 부분 */}
        <ProgressDescriptionWrapper>
          <ProgressDescriptionTitle>진행상황</ProgressDescriptionTitle>
          <ProgressDescriptionPercentTxt>
            {(solvedCheck.size / 10) * 100}%
          </ProgressDescriptionPercentTxt>
        </ProgressDescriptionWrapper>
        <CommonProgress
          progress={(solvedCheck.size / 10) * 100}
          stepLabels={[]}
        ></CommonProgress>

        {/* 문제 네비게이터 부분 */}
        <QuestionNavigator>
          <QuestionNavigatorTitle>문제 바로가기</QuestionNavigatorTitle>
          <QuestionNumberList>
            {/* 이부분 나중에 api나오면 map으로 동적으로 그리게 할거임 */}
            {/* 아님 걍 state 값으로 map돌릴까? */}
            {Array.from({ length: 10 }, (_, i) => (
              <QuestionNumberItem
                key={i + 1}
                active={i + 1 === currentQuestionIndex}
                solved={solvedCheck.has(i + 1)}
                onClick={() => setCurrentQuestionIndex(i + 1)}
              >
                {i + 1}
              </QuestionNumberItem>
            ))}
          </QuestionNumberList>
        </QuestionNavigator>

        {/* 문제 푸는 본문 전체 */}
        <SolveContentWrapper>
          {/* 왼쪽에 있는 문제지 */}
          <QuestionArea>
            <QuestionAreaHeader>
              <QuestionAreaTitle>문제 {currentQuestionIndex}</QuestionAreaTitle>
            </QuestionAreaHeader>
            <QuestionWrapper>
              <QuestionStem>{questions[currentQuestionIndex - 1].stem}</QuestionStem>
              <OptionList>
                {questions[currentQuestionIndex - 1].options.map((opt, i) => (
                  <OptionItem key={i} onClick={() => markSolved(currentQuestionIndex)}>{`${i + 1}. ${opt}`}</OptionItem>
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

          {/* 오른쪽에 있는 놈들 묶어두는 거 */}
          <RightSidebar>
            {/* 학습모드 선택하는 부분 */}
            <ModeCard>
              <CardTitle>학습 모드</CardTitle>
              <ModeSelector>
                <ModeButton
                  active={selectedMode === '시험'}
                  onClick={() => setSelectedMode('시험')}
                >
                  <GraduationCap size={16} />
                  시험
                </ModeButton>
                <ModeButton
                  active={selectedMode === '학습'}
                  onClick={() => setSelectedMode('학습')}
                >
                  <BookOpen size={16} />
                  학습
                </ModeButton>
                <ModeButton
                  active={selectedMode === '카드'}
                  onClick={() => setSelectedMode('카드')}
                >
                  <CreditCard size={16} />
                  카드
                </ModeButton>
              </ModeSelector>
            </ModeCard>
            {/* 문제풀고있는 현황 부분 */}
            <ProgressCard>
              <CardTitle>진행 현황</CardTitle>
              <ProgressStats>
                <ProgressStatItem>
                  <ProgressStatLabel>전체 문제</ProgressStatLabel>
                  <ProgressStatValue>{questions.length}</ProgressStatValue>
                </ProgressStatItem>
                  <ProgressStatItem>
                  <ProgressStatLabel>답변 완료</ProgressStatLabel>
                  <ProgressStatValue>{solvedCheck.size}</ProgressStatValue>
                </ProgressStatItem>
                  <ProgressStatItem>
                  <ProgressStatLabel>남은 문제</ProgressStatLabel>
                  <ProgressStatValue>{questions.length - solvedCheck.size}</ProgressStatValue>
                </ProgressStatItem>
              </ProgressStats>
            </ProgressCard>
          </RightSidebar>
        </SolveContentWrapper>
      </SolveWrapper>
    </PageLayout>
  );
}

export default Solve;
