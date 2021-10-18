import { DocumentReference } from "@firebase/firestore";

export interface FVote {
  poll: DocumentReference;
  name?: string;
  email?: string;
  /** Ids of the voter's selected answers */
  answers: number[];
}
