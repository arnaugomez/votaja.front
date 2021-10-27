import {
  addDoc,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import slugify from "slugify";
import { db } from "../../../common/data/firebase";
import { Data, Err } from "../../../common/data/models/Error";
import { getCompositeSlug } from "../../../common/util/getCompositeSlug";
import { Poll } from "../../domain/models/Poll";
import { Vote } from "../../domain/models/Vote";
import { FVote } from "../models/FVote";
import { toFVote } from "../presenters/toFVote";
import { toVoteDomain } from "../transformers/toVoteDomain";
import { IPollRepository } from "./../../domain/interfaces/IPollRepository";
import { FPoll } from "./../models/FPoll";
import { toFPoll } from "./../presenters/toFPoll";
import { toPollDomain } from "./../transformers/toPollDomain";

export class PollRepository implements IPollRepository {
  async createVote(pollId: string, vote: Vote) {
    const fVote = toFVote(vote, pollId);

    try {
      const docref = await addDoc(collection(db, "votes"), fVote);
      vote.id = docref.id;
    } catch (e) {
      console.error(e);
      return { vote: null, err: new Err("Could not save vote") };
    }

    return { vote, err: null };
  }

  async updateVote(pollId: string, vote: Vote) {
    const fVote = toFVote(vote, pollId);

    try {
      await setDoc(doc(db, "votes", vote.id), fVote);
    } catch (e) {
      console.error(e);
      return new Err("Could not update vote");
    }
    return null;
  }

  private async getVotesOfPoll(id: string): Promise<Vote[]> {
    const ref = doc(db, "polls", id);
    const q = query(collection(db, "votes"), where("poll", "==", ref));
    const result = await getDocs(q);
    if (result.empty) {
      return [];
    }
    return result.docs.map((snapshot) => {
      const id = snapshot.id;
      return toVoteDomain(snapshot.data() as FVote, id);
    });
  }

  private async fetchPollBySlug(
    slug: string
  ): Promise<QueryDocumentSnapshot<DocumentData>> {
    const q = query(collection(db, "polls"), where("slug", "==", slug));
    const result = await getDocs(q);
    if (result.empty) {
      return null;
    }
    return result.docs[0];
  }

  private async slugify(title: string): Promise<string> {
    const slug = slugify(title, { lower: true });
    let num = 0;
    while (await this.fetchPollBySlug(getCompositeSlug(slug, num))) {
      num++;
    }
    return getCompositeSlug(slug, num);
  }

  async createPoll(poll: Poll): Promise<Data<{ poll: Poll }>> {
    poll.slug = await this.slugify(poll.title);
    const fpoll = toFPoll(poll);

    try {
      const docref = await addDoc(collection(db, "polls"), fpoll);
      poll.id = docref.id;
    } catch (e) {
      console.error(e);
      return { poll: null, err: new Err("Could not save poll") };
    }

    return { poll, err: null };
  }

  async getPollBySlug(slug: string): Promise<Data<{ poll: Poll }>> {
    const p = await this.fetchPollBySlug(slug);
    if (p === null) {
      return {
        err: new Err(`Poll with slug ${slug} does not exist`),
        poll: null,
      };
    }

    const data = p.data();
    const votes = await this.getVotesOfPoll(p.id);
    return {
      poll: toPollDomain(data as FPoll, p.id, votes),
    };
  }

  async updatePoll(p: Poll): Promise<Err> {
    const fPoll = toFPoll(p);
    try {
      await updateDoc(doc(db, "polls", p.id), { ...fPoll });
    } catch (e) {
      console.error(e);
      return new Err("Could not update poll");
    }
    return null;
  }
}
