import { Err } from "../../../common/data/models/Error";
import { Poll } from "../models/Poll";

export interface IPollStore {
  createPoll(p: Poll): Promise<Err>;
  // getPollBySlug(s: string): Promise<Poll>
  // updatePoll(slug: string, p: Poll): Promise<Error>
}
