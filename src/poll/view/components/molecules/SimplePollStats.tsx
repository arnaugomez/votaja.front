import React from "react";
import { Poll } from "../../../domain/models/Poll";
import getSimiarVotesPercent from "../../../domain/use-cases/getSimilarVotesPercent";
import { useTranslation } from "next-i18next";

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
    <div className="flex-1 w-1/2 flex flex-col items-stretch text-center">
      <h3 className="text-xxs font-medium uppercase text-gray-600">{title}</h3>
      <p className="text-lg font-medium truncate">{value}</p>
    </div>
  );
}

export default function SimplePollStats({ poll, voteId }: Props) {
  const { t } = useTranslation("votePoll");
  return (
    <div className="flex divide-x pb-2">
      <SimplePollStatsItem
        title={t("results.mostVoted")}
        value={poll.mostVotedAnswer.title}
      />
      {poll.votes.some((v) => v.id === voteId) ? (
        <SimplePollStatsItem
          title={t("results.similarVotes")}
          value={`${getSimiarVotesPercent(poll, voteId)}%`}
        />
      ) : (
        <SimplePollStatsItem
          title={poll.votesMax ? t("results.votesLeft") : t("results.haveVoted")}
          value={`${
            poll.votesMax
              ? poll.votesMax - poll.votes.length
              : poll.votes.length
          } ${t('people')}`}
        />
      )}
    </div>
  );
}
