import React, { useEffect, useState } from "react";
import MaxWidth from "../../../../common/view/components/atoms/MaxWidth";
import { pollRepository } from "../../../data/repositories/PollRepository";
import { Poll } from "../../../domain/models/Poll";
import { Vote } from "../../../domain/models/Vote";
import { useVoteStore } from "../../store/voteStore";
import VoteForm from "../forms/VoteForm";
import VoteHero from "../molecules/VoteHero";
import PollResults from "./PollResults";

interface Props {
  poll: Poll;
}

export default function VoteSection({ poll: p }: Props) {
  const { vote, createVote, updateVote, getVoteFromLocalStorage } =
    useVoteStore();
  const [poll, setPoll] = useState<Poll>(p);
  const [showResults, setShowResults] = useState(false);

  async function handleVote(v: Vote) {
    if (vote) {
      await updateVote(v, p);
    } else {
      await createVote(v, p);
    }
    await refreshPoll();
    setShowResults(true);
  }

  useEffect(() => {
    const vote = getVoteFromLocalStorage(p);
    if (vote) {
      setShowResults(true);
    }
  }, []);

  async function refreshPoll() {
    const { poll, err } = await pollRepository.getPollBySlug(p.slug);
    if (err) {
      // TODO: Handle error with toaster
      console.error(err.message);
      return;
    }
    setPoll(poll);
  }

  return (
    <section className="pt-8 pb-12">
      <MaxWidth>
        <VoteHero poll={p} showDescription={!showResults} />
        {showResults ? (
          <PollResults
            vote={vote}
            onGoToVoteForm={() => setShowResults(false)}
            poll={poll}
          />
        ) : (
          <VoteForm
            poll={poll}
            vote={vote}
            onVote={handleVote}
            onShowResults={() => setShowResults(true)}
          />
        )}
      </MaxWidth>
    </section>
  );
}
