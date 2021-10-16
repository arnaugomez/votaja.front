import React, { useState } from "react";
import MaxWidth from "../../../common/view/atoms/MaxWidth";
import { Poll } from "../../domain/models/Poll";
import VoteHero from "../molecules/VoteHero";
import VoteForm from "../forms/VoteForm";
import { pollRepository } from "../../data/repositories/PollRepository";

interface Props {
  poll: Poll;
}

export default function Vote({ poll }: Props) {
  const [newPoll, setNewPoll] = useState<Poll>(null);
  const [showResults, setShowResults] = useState(false);
  const p = newPoll ?? poll;

  async function vote(newPoll: Poll) {
    const err = await pollRepository.updatePoll(newPoll);

    if (err) {
      // TODO: Handle error by showing toaster
      console.log(err.message);
    } else {
      setShowResults(true);
      setNewPoll(newPoll);
    }
  }
  return (
    <section className="pt-8 pb-12">
      <MaxWidth>
        <VoteHero poll={p} />
        {showResults ? null : (
          <VoteForm
            poll={p}
            onVote={vote}
            onShowResults={() => setShowResults(true)}
          />
        )}
      </MaxWidth>
    </section>
  );
}
