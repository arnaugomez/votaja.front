import React from "react";
import { Poll } from "../../domain/models/Poll";
import getSimiarVotesPercent from "../../domain/use-cases/getSimilarVotesPercent";

export interface Props {
  poll: Poll;
  voteId: string;
}

export default function SimplePollStats({ poll, voteId }: Props) {
  console.log(poll.mostVotedAnswer)
  return (
    <div className="flex divide-x">
      <div className="flex-1 text-center">
        <h3 className="text-xxs font-medium uppercase text-gray-600">Opció més votada</h3>
        <p className="text-lg font-medium">{poll.mostVotedAnswer.title}</p>
      </div>
      <div className="flex-1 text-center">
        <h3 className="text-xxs font-medium uppercase text-gray-600">Ha votat com tu un</h3>
        <p className="text-lg font-medium">{getSimiarVotesPercent(poll, voteId)}%</p>
      </div>
    </div>
  );
}
