import React from "react";
import Hero from "../landing/view/sections/Hero";
import { pollRepository } from "../poll/data/repositories/PollRepository";
import { Poll } from "../poll/domain/models/Poll";
import CreatePoll, { FormValues } from "../poll/view/forms/CreatePoll";

export default function Home() {
  async function createPoll(poll: Poll) {
    // TODO: Handle potential error by displaying a toaster
    await pollRepository.createPoll(poll);
  }

  return (
    <>
      <Hero />
      <CreatePoll onCreate={createPoll} />
    </>
  );
}
