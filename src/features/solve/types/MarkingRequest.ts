// export type MarkingRequest = {
//   questionId: number;
//   memberAnswer: string;
//   memberAnswerType: string;
// };

type MultiChoice = {
  questionId: number;
  memberAnswer: string;
  memberAnswerType: 'string';
};

type ShortAnswer = {
  questionId: number;
  memberAnswer: string;
  memberAnswerType: 'string';
};

type SingleChoice = {
  questionId: number;
  memberAnswer: boolean;
  memberAnswerType: 'boolean';
};

// 통합 타입 (세 가지 중 하나)
export type MarkingRequest = MultiChoice | ShortAnswer | SingleChoice;
