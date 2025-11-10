export type DifficultyType = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'FILL_IN_THE_BLANK';

export interface Question {
  id: number; // 문제집내 각각의 문제 id
  questionType: string; // 문제 타입인데 이후 QuestionSet으로 옴겨질수가있음
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
  createTime: string;
  updateTime: string;
}
