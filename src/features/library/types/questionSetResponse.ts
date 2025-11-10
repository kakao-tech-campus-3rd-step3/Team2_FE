export type DifficultyType = 'EASY' | 'MEDIUM' | 'HARD';

export type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';

export type QuestionSetStatus = 'FAILED' | 'PENDING' | 'COMPLETE';

export type LearningStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface MyQuestionSetsResponse {
  questionSetId: number;
  title: string;
  sourceIds: number[];
  sourceNames: string[];
  questionCount: number;
  difficultyType: DifficultyType;
  questionType: QuestionType;
  createdAt: string;
  commonFolderId: number;
  commonFolderName: string;
  learningStatus: LearningStatus;
}

export type QuestionSetContentType = MyQuestionSetsResponse & {
  status: QuestionSetStatus;
};
