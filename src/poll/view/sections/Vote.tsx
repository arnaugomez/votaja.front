import React, { useMemo, useState } from "react";
import MaxWidth from "../../../common/view/atoms/MaxWidth";
import { Poll } from "../../domain/models/Poll";
import VoteHero from "../molecules/VoteHero";
import VoteForm from "../forms/VoteForm";
import { pollRepository } from "../../data/repositories/PollRepository";
import PollResults from "./PollResults";
import { Vote } from "../../domain/models/Vote";

interface Props {
  poll: Poll;
}

export default function VoteSection({ poll: p }: Props) {
  const [poll, setPoll] = useState<Poll>(p);
  const [vote, setVote] = useState<Vote>(null);
  const [showResults, setShowResults] = useState(false);

  async function handleVote(v: Vote) {
    if (vote) {
      await updateVote(v);
    } else {
      await createVote(v);
    }
    await refreshPoll();
    setShowResults(true);
  }

  async function createVote(v: Vote) {
    const { vote, err } = await pollRepository.createVote(poll.id, v);
    if (err) {
      // TODO: Handle error with toaster
      console.error(err.message);
      return;
    }
    setVote(vote);
  }

  async function updateVote(v: Vote) {
    const err = await pollRepository.updateVote(poll.id, v);
    if (err) {
      // TODO: Handle error with toaster
      console.error(err.message);
      return;
    }
    setVote(vote);
  }

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
