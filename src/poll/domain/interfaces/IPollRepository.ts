import { Data, Err } from "../../../common/data/models/Error";
import { Poll } from "../models/Poll";

export type PollPromise = Promise<Data<{ poll: Poll }>>;

export interface IPollRepository {
  createPoll(p: Poll): PollPromise;
  getPollBySlug(slug: string): PollPromise;
  updatePoll(p: Poll): Promise<Err>
}
