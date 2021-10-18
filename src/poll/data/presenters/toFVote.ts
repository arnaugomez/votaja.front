import { DocumentReference } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../../common/data/firebase";
import { cleanse } from "../../../common/util/cleanse";
import { Vote } from "../../domain/models/Vote";
import { FVote } from "../models/FVote";

export const toFVote = (v: Vote, pollId: string): FVote => {
  const poll = doc(db, "polls", pollId);
  return {
    ...cleanse({
      answers: v.answers,
      email: v.email,
      name: v.name,
    }),
    poll,
  };
};
