export type DifficultyType = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'FILL_IN_THE_BLANK';

export interface MyQuestionSetsResponse {
  questionSetId: number;
  title: string;
  sourceIds: number[];
  sourceNames: string[];
  questionCount: number;
  difficultyType: DifficultyType;
  questionType: QuestionType;
  createdAt: string;
}
