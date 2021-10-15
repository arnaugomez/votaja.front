import { Poll } from "../../domain/models/Poll";
import { FPoll } from "../models/FPoll";

export const toFPoll = (p: Poll, slug: string): FPoll => ({
  slug,
  title: p.title,
  description: p.description,
  isMultipleChoice: p.isMultipleChoice,
  answers: p.answers,
  name: p.name,
  email: p.email,
  votes: p.votes,
  votesMax: p.votesMax,
});
