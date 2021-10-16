import React, { useState } from "react";
import MaxWidth from "../../../common/view/atoms/MaxWidth";
import { Poll } from "../../domain/models/Poll";
import VoteHero from "../molecules/VoteHero";
import VoteForm from '../forms/VoteForm'

interface Props {
  poll: Poll;
}

export default function Vote({ poll }: Props) {
  const [newPoll, setNewPoll] = useState<Poll>(null)
  const [showResults, setShowResults] = useState(false)
  const p = newPoll ?? poll
  async function vote(newPoll: Poll) {

    setShowResults(true)
  }
  return (
    <section className="pt-8 pb-12">
      <MaxWidth>
        <VoteHero poll={p} />
        {showResults ? null : <VoteForm poll={p} onVote={vote} onShowResults={() => setShowResults(true)} />}
      </MaxWidth>
    </section>
  );
}
