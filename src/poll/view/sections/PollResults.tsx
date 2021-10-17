import React, { useState } from "react";
import Button from "../../../common/view/atoms/Button";
import H2 from "../../../common/view/atoms/H2";
import { useConfetti } from "../../../common/view/hooks/useConfetti";
import { Poll } from "../../domain/models/Poll";
import CelebrationImg from "../atoms/CelebrationImg";
import ResultsGraph from "../molecules/ResultsGraph";
import SharePollUrl from "../molecules/SharePollUrl";
import SimplePollStats from "../molecules/SimplePollStats";
import BackIcon from "../../../../public/assets/icons/back.svg";

interface Props {
  poll: Poll;
  voteId: string;
  hasVoted: boolean;
  onGoToVoteForm: () => void;
}

export default function PollResults({
  poll,
  voteId,
  hasVoted,
  onGoToVoteForm,
}: Props) {
  useConfetti();
  const [moreInfo, setMoreInfo] = useState(false);

  return (
    <>
      <div className="px-4 py-6 border border-gray-100 rounded-2xl">
        <CelebrationImg />
        <H2 className="text-center pb-4">Resultats</H2>
        <SimplePollStats poll={poll} voteId={voteId} />
        <ResultsGraph poll={poll} voteId={voteId} moreInfo={moreInfo} />
        <div className="pt-10 flex justify-between space-x-4">
          <Button
            className="flex-1 flex items-center justify-center"
            variant="subtle"
            color={hasVoted ? "warning" : "primary"}
            onClick={onGoToVoteForm}
          >
            {!hasVoted && (
              <div className="h-5 w-5">
                <BackIcon />
              </div>
            )}
            <div>{hasVoted ? "Canvia el vot" : "Vota"}</div>
          </Button>
          <Button
            className="flex-1"
            variant="subtle"
            color="boring"
            onClick={() => setMoreInfo((v) => !v)}
          >
            {moreInfo ? "-" : "+"} info
          </Button>
        </div>
      </div>

      <div className="mt-4 py-6 px-4 bg-gray-50 rounded-2xl">
        <H2 className="text-center pb-4">Comparteix l&apos;enquesta</H2>
        <SharePollUrl poll={poll} />
      </div>
    </>
  );
}
