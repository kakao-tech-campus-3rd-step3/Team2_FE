export type DifficultyType = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'FILL_IN_THE_BLANK';

export interface Question {
  id: number; // 문제집내 각각의 문제 id
  questionText: string; // 질문
  options: string[]; // 항목
  answer: string; // 답
  explanation: string; // 설명
}

export interface QuestionSet {
  id: number;
  sourceIds: number[];
  ownerID: number;
  title: string; // pdf 이름
  questions: Question[]; // 문제들
  difficulty: DifficultyType;
  type: QuestionType;
  questionLength: number; // 문제수
  createTime: string; // ISO 8601 문자열 (예: 2025-09-16T23:41:07.943491)
  updateTime: string; // ISO 8601 문자열 (예: 2025-09-16T23:41:32.129409)
}
