export interface Answer {
  id: number;
  title: string;
}

export interface AnswerWithVotes extends Answer {
  votesAmount: number;
}
