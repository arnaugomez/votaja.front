import { Err } from "../../../common/data/models/Error";
import { Suggestion } from "../models/Suggestion";

export interface ISupportRepository {
  sendSuggestion(s: Suggestion): Promise<Err>;
}
