import { ListChecks, Binary, PenLine } from 'lucide-react';

export type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';

export const QUESTION_TYPE_DATA = [
  {
    id: 'MULTIPLE_CHOICE' as const,
    title: '객관식',
    description: '4개 선택지 중 정답 선택',
    icon: ListChecks,
  },
  {
    id: 'TRUE_FALSE' as const,
    title: '참/거짓',
    description: '참 또는 거짓 중 선택',
    icon: Binary,
  },
  {
    id: 'SHORT_ANSWER' as const,
    title: '단답형',
    description: '짧은 답변 직접 작성',
    icon: PenLine,
  },
];

export const QUESTION_TYPE_MAP = new Map(QUESTION_TYPE_DATA.map((item) => [item.id, item]));
