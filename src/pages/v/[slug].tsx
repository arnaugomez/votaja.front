import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { pollRepository } from "../../poll/data/repositories/PollRepository";
import { IPoll, Poll } from "../../poll/domain/models/Poll";
import Vote from "../../poll/view/sections/Vote";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface Props {
  poll: IPoll;
}

export const getServerSideProps: GetServerSideProps<Props, { slug: string }> =
  async ({ params, locale }) => {
    const { slug } = params;
    const p = await pollRepository.getPollBySlug(slug);
    if (p.err) {
      return { notFound: true };
    }
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "seo", "footer", 'votePoll'])),
        poll: p.poll.toObject(),
      },
    };
  };

export default function VotePage({ poll }: Props) {
  const p = new Poll(poll);
  const { t: seoT } = useTranslation("seo");
  return (
    <>
      <Head>
        <title>
          {seoT("poll")}: {poll.title} | {seoT("pollCreator")} VOTAJA
        </title>
        <meta name="description" content={seoT("description")} />
        <meta name="keywords" content={seoT("keywords")} />
        <meta name="author" content="Arnau Gómez" />
      </Head>
      <Vote poll={p} />
    </>
  );
}
