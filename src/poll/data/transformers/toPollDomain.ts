import { Poll } from "../../domain/models/Poll";
import { FPoll } from "./../models/FPoll";
export const toPollDomain = (p: FPoll) =>
  new Poll({
    answers: p.answers,
    description: p.description,
    email: p.email,
    id: p.id,
    isMultipleChoice: p.isMultipleChoice,
    name: p.name,
    slug: p.slug,
    title: p.title,
    votes: p.votes,
    votesMax: p.votesMax,
  });
