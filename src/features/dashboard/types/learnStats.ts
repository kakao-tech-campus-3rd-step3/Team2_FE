export interface LearnStatsResponse {
  totalQuestionSetCount: number;
  totalSolvedQuestionSetCount: number;
  totalQuestionCount: number;
  totalSolvedQuestionCount: number;
  totalCorrectQuestionCount: number;
  weeklySolvedQuestionCount: number;
  consecutiveLearningDays: number;
  lastLearningDate: string;
}
