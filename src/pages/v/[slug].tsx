import { GetServerSideProps } from "next";
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
  const p = new Poll(poll)
  return (
    <>
      <Vote poll={p} />
    </>
  );
}
