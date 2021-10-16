import { Poll } from "./../models/Poll";
export default function getSimiarVotesPercent(p: Poll, voteId: string): number {
  const myVote = p.votes.find((v) => (v.id = voteId));

  const votesLikeMineAmount = p.votes.reduce((prev, current) => {
    /*
    if(current.id === voteId) {
      return prev
    }
    */
    if (current.answers.some((a) => myVote.answers.some((a2) => a2 === a))) {
      return prev + 1;
    }
    return prev;
  }, 0);

  return Math.floor((votesLikeMineAmount * 100) / p.votes.length);
}
