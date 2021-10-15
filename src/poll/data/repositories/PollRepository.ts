import { toFPoll } from "./../presenters/toFPoll";
import {
  addDoc,
  DocumentData,
  QueryDocumentSnapshot,
} from "@firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../common/data/firebase";
import { Err } from "../../../common/data/models/Error";
import { Poll } from "../../domain/models/Poll";
import { IPollRepository } from "./../../domain/interfaces/IPollRepository";
import slugify from "slugify";
import { getCompositeSlug } from "../../../common/util/getCompositeSlug";

class PollRepository implements IPollRepository {
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

  async createPoll(p: Poll): Promise<Err> {
    const slug = await this.slugify(p.title);
    const poll = toFPoll(p, slug);
    console.log(poll)

    try {
      await addDoc(collection(db, "polls"), poll);
    } catch(e) {
      console.log(e)
      return new Err("Could not save poll");
    }

    return null;
  }
}

export const pollRepository: IPollRepository = new PollRepository();
