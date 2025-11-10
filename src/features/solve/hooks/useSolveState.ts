import { useState, useEffect } from 'react';
import type { MarkingRequest } from '@/features/solve/types/MarkingRequest';

interface UseSolveStateProps {
  questionSetId: string | undefined;
  isReviewing: boolean;
}

export function useSolveState({ questionSetId, isReviewing }: UseSolveStateProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
  const [solvedCheck, setSolvedCheck] = useState<MarkingRequest[]>([]);
  const [isAllSolved, setIsAllSolved] = useState<boolean>(false);
  const [isExplanationPage, setIsExplanationPage] = useState<boolean>(false);

  // URL 파라미터 변경 시 상태 초기화
  useEffect(() => {
    setCurrentQuestionIndex(1);
    setSolvedCheck([]);
    setIsAllSolved(false);
    setIsExplanationPage(false);
  }, [questionSetId, isReviewing]);

  const goExplanationPage = () => {
    setIsAllSolved(false);
    setIsExplanationPage(true);
    setCurrentQuestionIndex(1);
  };

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    solvedCheck,
    setSolvedCheck,
    isAllSolved,
    setIsAllSolved,
    isExplanationPage,
    setIsExplanationPage,
    goExplanationPage,
  };
}
