import React, { useEffect, useState } from "react";
import { Poll } from "../../../domain/models/Poll";
import UsersIcon from "@icons/users";

export interface Props {
  poll: Poll;
  voteId: string;
  moreInfo: boolean;
}

import { useTranslation } from "next-i18next";
export default function ResultsGraph({ poll, voteId, moreInfo }: Props) {
  const [showBars, setShowBars] = useState(false);
  useEffect(() => {
    setTimeout(() => setShowBars(true), 20);
  }, []);

  const myAnswers = poll.votes.find((v) => v.id === voteId)?.answers ?? [];

  const votesNum = poll.votes.length;
  const { t } = useTranslation("votePoll");
  return (
    <div className="pt-4">
      <h3 className="text-sm pt-2 pb-3 font-medium">{t("results.stats")}</h3>
      <ul className="space-y-3">
        {poll.answersWithVotes.map((v) => {
          const votesPercent = Math.floor((v.votesAmount * 100) / votesNum);
          const bigBar = votesPercent > 50;
          const votesNumLabel = `${v.votesAmount} ${t("results.votes")}`;
          const isMine = myAnswers.some((a) => a === v.id);
          return (
            <li
              key={v.id}
              className={moreInfo ? "pb-4 border-b space-y-3" : undefined}
            >
              <div className="flex items-center space-x-2">
                <div
                  className={
                    "w-28 flex-none truncate text-sm " +
                    (isMine ? "text-gray-700" : "text-gray-600")
                  }
                >
                  {v.title}
                </div>
                <div className="relative flex-1 flex items-center space-x-2">
                  <div
                    className={
                      "rounded text-xs text-white pr-2 flex items-center justify-end h-6 overflow-hidden transition-all duration-1000 ease-out " +
                      (isMine ? "bg-primary-600" : "bg-primary-500")
                    }
                    style={{ width: `${showBars ? votesPercent : 0}%` }}
                  >
                    <div>{bigBar && votesNumLabel}</div>
                  </div>
                  <div className="text-xs text-primary-500">
                    {!bigBar && votesNumLabel}
                  </div>
                </div>
              </div>
              {moreInfo && !!v.votesAmount && (
                <div className="flex text-gray-600 space-x-2 pl-2">
                  <div className="relative block flex-none h-4 w-4">
                    <UsersIcon />
                  </div>
                  <p className="flex-1 text-xs leading-relaxed items-center break-all">
                    {poll.votes
                      .filter((vote) =>
                        vote.answers.some((answer) => answer === v.id)
                      )
                      .map((vote) => vote.name)
                      .join(", ")}
                  </p>
                </div>
              )}
            </li>
          );
        })}
        <li></li>
      </ul>
    </div>
  );
}
