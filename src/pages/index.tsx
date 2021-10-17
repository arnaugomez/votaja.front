import React, { useEffect, useState } from "react";
import Hero from "../landing/view/sections/Hero";
import { pollRepository } from "../poll/data/repositories/PollRepository";
import { Poll } from "../poll/domain/models/Poll";
import CreatePoll from "../poll/view/forms/CreatePoll";
import SharePoll from "../poll/view/sections/SharePoll";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainLayout from "../common/view/sections/MainLayout";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "seo",
        "footer",
        "createPoll",
      ])),
      // Will be passed to the page component as props
    },
  };
}

export default function Home() {
  const [poll, setPoll] = useState<Poll>(null);
  const [showShare, setShowShare] = useState(false);
  async function createPoll(p: Poll) {
    const { poll, err } = await pollRepository.createPoll(p);
    if (err) {
      // TODO: Handle potential error by displaying a toaster
      console.error(err.message);
    } else {
      setPoll(poll);
      setShowShare(true);
    }
  }

  async function updatePoll(p: Poll) {
    console.log(p);
    const err = await pollRepository.updatePoll(p);
    if (err) {
      // TODO: Handle potential error by displaying a toaster
      console.error(err.message);
    } else {
      setPoll(p);
      setShowShare(true);
    }
  }
  useEffect(() => {
    console.log(pollRepository.getPollBySlug("a"));
  }, []);

  const goBack = () => setShowShare(false);

  const { t: seoT } = useTranslation("seo");
  return (
    <MainLayout>
      <Head>
        <title>Votaja: {seoT("title")} | VOTAJA</title>
        <meta name="description" content={seoT("description")} />
        <meta name="keywords" content={seoT("keywords")} />
        <meta name="author" content="Arnau Gómez" />
      </Head>
      <Hero />
      {showShare ? (
        <SharePoll
          poll={poll}
          onGoBack={goBack}
          onNewPoll={() => {
            setPoll(null);
            goBack();
          }}
        />
      ) : (
        <CreatePoll
          poll={poll}
          onCreate={(p) => (poll ? updatePoll(p) : createPoll(p))}
        />
      )}
    </MainLayout>
  );
}
