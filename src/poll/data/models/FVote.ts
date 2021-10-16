export interface FVote {
  id: string;
  name?: string;
  email?: string;
  /** Ids of the voter's selected answers */
  answers: number[];
}
