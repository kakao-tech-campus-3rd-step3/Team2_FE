export interface WrongNoteSet {
  questionSetId: number;
  questionSetTitle: string;
  sourceNames: string[];
  difficulty: string;
  majorTopic: string;
  incorrectCount: number;
}

export type WrongNoteSetResponse = WrongNoteSet[];
