import React, { useEffect, useState } from "react";
import MaxWidth from "../../../common/view/components/atoms/MaxWidth";
import { pollRepository } from "../../data/repositories/PollRepository";
import { Poll } from "../../domain/models/Poll";
import { Vote } from "../../domain/models/Vote";
import VoteForm from "../forms/VoteForm";
import VoteHero from "../molecules/VoteHero";
import PollResults from "./PollResults";

interface Props {
  poll: Poll;
}

const LS_VOTE_OF_POLL_PREFIX = "voteOfPoll_";

export default function VoteSection({ poll: p }: Props) {
  const [poll, setPoll] = useState<Poll>(p);
  const [vote, setVote] = useState<Vote>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    try {
      const voteId = localStorage.getItem(LS_VOTE_OF_POLL_PREFIX + p.id);
      const vote = p.getVoteById(voteId);
      if (vote) {
        setVote(p.getVoteById(voteId));
        setShowResults(true);
      }
    } catch {}
  }, []);

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
    try {
      localStorage.setItem(LS_VOTE_OF_POLL_PREFIX + poll.id, vote.id);
    } catch {}
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
