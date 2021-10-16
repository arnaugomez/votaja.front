import { Option } from "../../../common/view/view-models/Option";
import { Answer } from "../../domain/models/Answer";
export const optionToAnswer = (a: Option<number>): Answer => ({
  title: a.label,
  id: a.value,
});
