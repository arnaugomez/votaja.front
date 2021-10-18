import { Poll } from "../../domain/models/Poll";
import { Vote } from "../../domain/models/Vote";
import { FPoll } from "./../models/FPoll";
export const toPollDomain = (p: FPoll, id: string, votes: Vote[]) =>
  new Poll({
    answers: p.answers,
    description: p.description,
    email: p.email,
    id,
    isMultipleChoice: p.isMultipleChoice,
    name: p.name,
    slug: p.slug,
    title: p.title,
    votes,
    votesMax: p.votesMax,
  });
