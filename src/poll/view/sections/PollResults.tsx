import React from "react";
import H2 from "../../../common/view/atoms/H2";
import { Poll } from "../../domain/models/Poll";
import CelebrationImg from "../atoms/CelebrationImg";
import SimplePollStats from "../molecules/SimplePollStats";

interface Props {
  poll: Poll;
  voteId: string;
  hasVoted: boolean;
  onGoToVoteForm: () => void;
}

export default function PollResults({poll, voteId}: Props) {
  return (
    <div className="px-4 py-6 border border-gray-100 rounded-2xl">
      <CelebrationImg />
      <H2 className="text-center pb-4">Resultats</H2>
      <SimplePollStats poll={poll} voteId={voteId} />
    </div>
  );
}
