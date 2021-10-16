import React, { useState } from "react";
import Hero from "../landing/view/sections/Hero";
import { pollRepository } from "../poll/data/repositories/PollRepository";
import { Poll } from "../poll/domain/models/Poll";
import CreatePoll from "../poll/view/forms/CreatePoll";
import SharePoll from "../poll/view/sections/SharePoll";
import Head from "next/head";

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
      <Head>
        <title>Votaja: crea una enquesta en 10 segons | VOTAJA</title>
        <meta
          name="description"
          content="Votaja és el creador d'enquestes més ràpid que hi ha. Crea una enquesta en 10 segons i comparteix-la per Whatsapp o a la teva pàgina web."
        />
        <meta
          name="keywords"
          content="votaja, enquesta, enquestes, generador d'enquestes, creador d'enquestes, crea enquesta, pancripto, pancripto labs, Arnau Gómez, enquesta whatsapp, enquestes whatsapp"
        />
        <meta name="author" content="Arnau Gómez" />
      </Head>
      <Hero />
      {poll ? <SharePoll poll={poll} /> : <CreatePoll onCreate={createPoll} />}
    </>
  );
}
