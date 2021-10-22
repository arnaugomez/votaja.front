import { Poll } from "../models/Poll";
import { Vote } from "../models/Vote";

export interface IVoteStore {
  vote: Vote;
  createVote(v: Vote, p: Poll): Promise<void>;
  updateVote(v: Vote, p: Poll): Promise<void>;
  getVoteFromLocalStorage(p: Poll): Vote
}
