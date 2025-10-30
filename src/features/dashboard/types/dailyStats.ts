export interface DailyStatItem {
  date: string; // 학습한 날
  count: number; // 그날 학습한 횟수
}

export type DailyStatsResponse = DailyStatItem[];
