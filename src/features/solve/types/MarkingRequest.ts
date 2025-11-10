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

export type MarkingRequest = MultiChoice | ShortAnswer | SingleChoice;
