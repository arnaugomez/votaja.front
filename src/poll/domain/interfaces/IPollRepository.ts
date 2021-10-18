import { Data, Err } from "../../../common/data/models/Error";
import { Poll } from "../models/Poll";
import { Vote } from "../models/Vote";

export type PollPromise = Promise<Data<{ poll: Poll }>>;
export type VotePromise = Promise<Data<{ vote: Vote }>>;

export interface IPollRepository {
  createPoll(p: Poll): PollPromise;
  getPollBySlug(slug: string): PollPromise;
  updatePoll(p: Poll): Promise<Err>;

  createVote(pollId: string, vote: Vote): Promise<Data<{ vote: Vote }>>;
  updateVote(pollId: string, vote: Vote): Promise<Err>;
}
