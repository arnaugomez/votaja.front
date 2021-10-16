import { Option } from '../../../common/view/view-models/Option';
import { Answer } from '../../domain/models/Answer';
export const answerToOption = (a: Answer): Option<number> => ({
  label: a.title,
  value: a.id
})