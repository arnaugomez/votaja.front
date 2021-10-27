import { toFSuggestion } from "./../presenters/toFSuggestion";
import { db } from "./../../../common/data/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { Err } from "src/common/data/models/Error";
import { Suggestion } from "src/support/domain/models/Suggestion";
import { ISupportRepository } from "./../../domain/interfaces/ISupportRepository";

export class SupportRespository implements ISupportRepository {
  async sendSuggestion(s: Suggestion): Promise<Err> {
    try {
      await addDoc(collection(db, "suggestions"), toFSuggestion(s));
    } catch {
      return new Err("Could not send suggestion");
    }
    return null;
  }
}
