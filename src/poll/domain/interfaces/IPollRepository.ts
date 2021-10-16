import { Err } from "../../../common/data/models/Error";
import { Poll } from "../models/Poll";

export interface IPollRepository {
  createPoll(p: Poll): Promise<{ poll: Poll; err?: Err }>;
  // getPollBySlug(s: string): Promise<{poll: Poll, err: Error}>;
  // updatePoll(slug: string, p: Poll): Promise<Error>
}
