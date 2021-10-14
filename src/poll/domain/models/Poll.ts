import { Vote } from "./Vote";
import { TitleDescription } from "./../../../common/domain/models/TitleDescription";
import { Answer, AnswerWithVotes } from "./Answer";

export class Poll implements IPoll {
  title: IPoll["title"];
  description: IPoll["description"];
  isMultipleChoice: IPoll["isMultipleChoice"];
  answers: IPoll["answers"];
  name?: IPoll["name"];
  email?: IPoll["email"];
  votes: IPoll["votes"];

  constructor(p: IPoll) {
    this.title = p.title;
    this.description = p.description;
    this.isMultipleChoice = p.isMultipleChoice;
    this.answers = p.answers;
    this.name = p.name;
    this.email = p.email;
    this.votes = p.votes;
  }

  toObject(): IPoll {
    const {
      answers,
      description,
      isMultipleChoice,
      title,
      votes,
      email,
      name,
    } = this;
    return {
      answers,
      description,
      isMultipleChoice,
      title,
      votes,
      email,
      name,
    };
  }

  get answersWithVotes(): AnswerWithVotes[] {
    const answersWithVotes: AnswerWithVotes[] = this.answers.map((a) => ({
      ...a,
      votes: 0,
    }));
    for (const v of this.votes) {
      for (const id of v.answers) {
        answersWithVotes.find((a) => a.id === id).votesAmount += 1
      }
    }
    return answersWithVotes;
  }
}

interface IPoll extends TitleDescription {
  isMultipleChoice: boolean;
  answers: Answer[];
  /** Email of the creator */
  name?: string;
  email?: string;
  votes: Vote[];
}
