import { Poll } from "./../models/Poll";
/** Gets the percentage of people who voted like you (including yourself) */
export default function getSimiarVotesPercent(p: Poll, voteId: string): number {
  const myVote = p.votes.find((v) => v.id === voteId);
  if (!myVote) {
    return 0;
  }

  const votesLikeMineAmount = p.votes.reduce((prev, current) => {
    if (current.answers.some((a) => myVote.answers.some((a2) => a2 === a))) {
      return prev + 1;
    }
    return prev;
  }, 0);

  return Math.floor((votesLikeMineAmount * 100) / p.votes.length);
}
