import { TitleDescription } from './../../../common/domain/models/TitleDescription';
import { FAnswer } from './FAnswer';
import { FVote } from './FVote';

/** Model of a poll as is stored in FireStore */
export interface FPoll extends TitleDescription {
  id?: string;
  slug: string;

  isMultipleChoice: boolean;
  answers: FAnswer[];
  name?: string;
  email?: string;
  votes: FVote[];
  votesMax?: number;
}