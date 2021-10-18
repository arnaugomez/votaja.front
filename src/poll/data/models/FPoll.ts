import { TitleDescription } from './../../../common/domain/models/TitleDescription';
import { FAnswer } from './FAnswer';

/** Model of a poll as is stored in FireStore */
export interface FPoll extends TitleDescription {
  slug: string;

  isMultipleChoice: boolean;
  answers: FAnswer[];
  name?: string;
  email?: string;
  votesMax?: number;
}