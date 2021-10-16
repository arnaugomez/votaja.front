import React, { useState } from "react";
import Hero from "../landing/view/sections/Hero";
import { pollRepository } from "../poll/data/repositories/PollRepository";
import { Poll } from "../poll/domain/models/Poll";
import CreatePoll from "../poll/view/forms/CreatePoll";
import SharePoll from "../poll/view/sections/SharePoll";

export default function Home() {
  const [poll, setPoll] = useState<Poll>(null);
  async function createPoll(p: Poll) {
    const { poll, err } = await pollRepository.createPoll(p);
    if (err) {
      // TODO: Handle potential error by displaying a toaster
      console.error(err.message);
    } else {
      setPoll(poll);
    }
  }

  return (
    <>
      <Hero />
      {poll ? <SharePoll poll={poll} /> : <CreatePoll onCreate={createPoll} />}
    </>
  );
}
