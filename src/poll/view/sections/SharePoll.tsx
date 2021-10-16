import React from "react";
import H2 from "../../../common/view/atoms/H2";
import MaxWidth from "../../../common/view/atoms/MaxWidth";
import { useConfetti } from "../../../common/view/hooks/useConfetti";
import { Poll } from "../../domain/models/Poll";
import CelebrationImg from "../atoms/CelebrationImg";
import SharePollEmbed from "../molecules/SharePollEmbed";
import SharePollUrl from "../molecules/SharePollUrl";

interface Props {
  poll: Poll;
}

export default function SharePoll({ poll }: Props) {
  useConfetti()

  return (
    <section className="pb-16">
      <MaxWidth>
        <div className="py-6 px-4 bg-gray-50 rounded-2xl">
          <CelebrationImg />
          <H2 className="text-center pb-4">Enquesta creada</H2>

          <SharePollUrl poll={poll} />
          <SharePollEmbed poll={poll} />
        </div>
      </MaxWidth>
    </section>
  );
}
