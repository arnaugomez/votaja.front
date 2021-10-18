import { cleanse } from "../../../common/util/cleanse";
import { Vote } from "../../domain/models/Vote";
import { FVote } from "../models/FVote";

export const toVoteDomain = (v: FVote, id: string): Vote => cleanse({
  answers: v.answers,
  id,
  email: v.email,
  name: v.name,
});
