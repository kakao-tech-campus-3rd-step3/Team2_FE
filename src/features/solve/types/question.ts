
export interface Question {
  id: number;              // 문제 고유 ID
  questionText: string;    // 문제 텍스트
  options: string[];       // 선택지
  answer: string;          // 정답
  explanation: string;     // 해설
}
