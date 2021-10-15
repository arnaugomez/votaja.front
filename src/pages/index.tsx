import React from "react";
import Hero from "../landing/view/sections/Hero";
import { pollRepository } from "../poll/data/repositories/PollRepository";
import { Poll } from "../poll/domain/models/Poll";
import CreatePoll, {
  CreatePollFormValues,
} from "../poll/view/forms/CreatePoll";

export default function Home() {
  async function savePoll(values: CreatePollFormValues) {
    // TODO: Handle potential error by displaying a toaster
    await pollRepository.createPoll(
      new Poll({
        ...values,
        votesMax: parseInt(values.votesMax),
        answers: values.answers.map((a) => ({ id: a.value, title: a.label })),
        votes: [],
      })
    );
  }

  return (
    <>
      <Hero />
      <CreatePoll onCreate={savePoll} />
    </>
  );
}
