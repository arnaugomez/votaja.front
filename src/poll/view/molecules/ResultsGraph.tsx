import React, { useEffect, useState } from "react";
import { Poll } from "../../domain/models/Poll";

export interface Props {
  poll: Poll;
  voteId: string;
  moreInfo: boolean;
}

export default function ResultsGraph({ poll, voteId, moreInfo }: Props) {
  const [showBars, setShowBars] = useState(false);
  useEffect(() => setShowBars(true), []);

  const myAnswers = poll.votes.find((v) => v.id === voteId)?.answers ?? [];

  const votesNum = poll.votes.length;
  return (
    <div className="pt-4">
      <h3 className="text-sm pt-2 pb-3 font-medium">Estadístiques</h3>
      <ul className="space-y-2">
        {poll.answersWithVotes.map((v) => {
          const votesPercent = Math.floor((v.votesAmount * 100) / votesNum);
          const bigBar = votesPercent > 50;
          const votesNumLabel = `${v.votesAmount} vots`;
          const isMine = myAnswers.some((a) => a === v.id);
          return (
            <li key={v.id} className="flex items-stretch space-x-2">
              <div className="w-28 flex-none truncate text-sm text-gray-600">
                {v.title}
              </div>
              <div className="relative flex-1 flex items-center space-x-2">
                <div
                  className={
                    "rounded text-xs text-white pr-2 flex items-center justify-end h-full overflow-hidden transition-all duration-1000 ease-out " +
                    (isMine ? "bg-primary-600" : "bg-primary-500")
                  }
                  style={{ width: `${showBars ? votesPercent : 0}%` }}
                >
                  {bigBar && votesNumLabel}
                </div>
                <div className="text-xs text-primary-500">
                  {!bigBar && votesNumLabel}
                </div>
              </div>
            </li>
          );
        })}
        <li></li>
      </ul>
    </div>
  );
}
