import { cleanse } from "../../../common/util/cleanse";
import { Poll } from "../../domain/models/Poll";
import { FPoll } from "../models/FPoll";

export const toFPoll = (p: Poll): FPoll => cleanse({
  slug: p.slug,
  title: p.title,
  description: p.description,
  isMultipleChoice: p.isMultipleChoice,
  answers: p.answers,
  name: p.name,
  email: p.email,
  votes: p.votes,
  votesMax: p.votesMax,
});
