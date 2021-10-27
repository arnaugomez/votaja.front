import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useState } from "react";
import { pollRepository } from "src/poll/pollModule";
import MainLayout from "../common/view/components/sections/MainLayout";
import Hero from "../landing/view/sections/Hero";
import { Poll } from "../poll/domain/models/Poll";
import CreatePoll from "../poll/view/components/forms/CreatePoll";
import SharePoll from "../poll/view/components/sections/SharePoll";

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
    const err = await pollRepository.updatePoll(p);
    if (err) {
      // TODO: Handle potential error by displaying a toaster
      console.error(err.message);
    } else {
      setPoll(p);
      setShowShare(true);
    }
  }

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
