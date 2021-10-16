import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { pollRepository } from "../../poll/data/repositories/PollRepository";
import { IPoll, Poll } from "../../poll/domain/models/Poll";
import Vote from "../../poll/view/sections/Vote";

interface Props {
  poll: IPoll;
}

export const getServerSideProps: GetServerSideProps<Props, { slug: string }> =
  async (context) => {
    const { slug } = context.params;
    const p = await pollRepository.getPollBySlug(slug);
    if (p.err) {
      return { notFound: true };
    }
    return {
      props: { poll: p.poll.toObject() },
    };
  };

export default function VotePage({ poll }: Props) {
  const p = new Poll(poll);
  return (
    <>
      <Head>
        <title>Enquesta: {poll.title} | Creador d&apos;enquestes VOTAJA</title>
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
      <Vote poll={p} />
    </>
  );
}
