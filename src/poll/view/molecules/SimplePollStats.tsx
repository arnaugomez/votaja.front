import React from "react";
import { Poll } from "../../domain/models/Poll";
import getSimiarVotesPercent from "../../domain/use-cases/getSimilarVotesPercent";

export interface Props {
  poll: Poll;
  voteId: string;
}

function SimplePollStatsItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex-1 text-center">
      <h3 className="text-xxs font-medium uppercase text-gray-600">{title}</h3>
      <p className="text-lg font-medium truncate">{value}</p>
    </div>
  );
}

export default function SimplePollStats({ poll, voteId }: Props) {
  return (
    <div className="flex divide-x pb-2">
      <SimplePollStatsItem
        title="Opció més votada"
        value={poll.mostVotedAnswer.title}
      />
      {poll.votes.some((v) => v.id === voteId) ? (
        <SimplePollStatsItem
          title="Ha votat com tu"
          value={`${getSimiarVotesPercent(poll, voteId)}%`}
        />
      ) : (
        <SimplePollStatsItem
          title={poll.votesMax ? "Queden per votar" : "Han votat"}
          value={`${
            poll.votesMax
              ? poll.votesMax - poll.votes.length
              : poll.votes.length
          } persones`}
        />
      )}
    </div>
  );
}
