import { Vote } from "./Vote";
import { TitleDescription } from "./../../../common/domain/models/TitleDescription";
import { Answer, AnswerWithVotes } from "./Answer";
import { cleanse } from "../../../common/util/cleanse";

export class Poll implements IPoll {
  answers: IPoll["answers"];
  description: IPoll["description"];
  email?: IPoll["email"];
  id: IPoll["id"];
  isMultipleChoice: IPoll["isMultipleChoice"];
  name?: IPoll["name"];
  slug: IPoll["slug"];
  title: IPoll["title"];
  votes: IPoll["votes"];
  votesMax: IPoll["votesMax"];

  constructor(p: IPoll) {
    this.answers = p.answers;
    this.description = p.description;
    this.email = p.email;
    this.id = p.id;
    this.isMultipleChoice = p.isMultipleChoice;
    this.name = p.name;
    this.slug = p.slug;
    this.title = p.title;
    this.votes = p.votes;
    this.votesMax = p.votesMax;
  }

  toObject(): IPoll {
    const {
      answers,
      description,
      email,
      id,
      isMultipleChoice,
      name,
      slug,
      title,
      votes,
      votesMax,
    } = this;
    return cleanse({
      answers,
      description,
      email,
      id,
      isMultipleChoice,
      name,
      slug,
      title,
      votes,
      votesMax,
    });
  }

  get answersWithVotes(): AnswerWithVotes[] {
    const answersWithVotes: AnswerWithVotes[] = this.answers.map((a) => ({
      ...a,
      votesAmount: 0,
    }));
    for (const v of this.votes) {
      for (const id of v.answers) {
        answersWithVotes.find((a) => a.id === id).votesAmount += 1;
      }
    }
    return answersWithVotes;
  }

  get mostVotedAnswer(): AnswerWithVotes {
    if (!this.answers?.length) {
      return null;
    }
    return this.answersWithVotes.sort(
      (a, b) => b.votesAmount - a.votesAmount
    )[0];
  }

  getVoteById(id: string) {
    return this.votes.find(v => v.id === id)
  }
}

export interface IPoll extends TitleDescription {
  id?: string;
  slug?: string;
  isMultipleChoice: boolean;
  answers: Answer[];
  name?: string;
  /** Email of the creator */
  email?: string;
  votes: Vote[];
  votesMax?: number;
}
