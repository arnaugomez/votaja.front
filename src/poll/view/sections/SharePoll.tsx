import React from "react";
import Button from "../../../common/view/components/atoms/Button";
import H2 from "../../../common/view/components/atoms/H2";
import MaxWidth from "../../../common/view/components/atoms/MaxWidth";
import { useConfetti } from "../../../common/view/hooks/useConfetti";
import { Poll } from "../../domain/models/Poll";
import CelebrationImg from "../atoms/CelebrationImg";
import SharePollEmbed from "../molecules/SharePollEmbed";
import SharePollUrl from "../molecules/SharePollUrl";
import BackIcon from "@icons/back";
import { useTranslation } from "next-i18next";

interface Props {
  poll: Poll;
  onGoBack: () => void;
  onNewPoll: () => void;
}

export default function SharePoll({ poll, onGoBack, onNewPoll }: Props) {
  useConfetti();

  const { t } = useTranslation("createPoll");
  return (
    <section className="pb-16">
      <MaxWidth>
        <div className="py-6 px-4 bg-gray-50 rounded-2xl">
          <CelebrationImg />
          <H2 className="text-center pb-4">{t("share.title")}</H2>

          <SharePollUrl poll={poll} />
          <SharePollEmbed poll={poll} />
        </div>
        <div className="px-4 pt-12 flex justify-between">
          <Button
            className="text-sm flex items-center justify-center"
            variant="subtle"
            color="warning"
            onClick={onGoBack}
          >
            <div className="h-5 w-5">
              <BackIcon />
            </div>
            <div>{t("share.changePoll")}</div>
          </Button>
          <Button
            className="text-sm flex items-center justify-center"
            variant="subtle"
            color="boring"
            onClick={onNewPoll}
          >
            <div>{t("share.newPoll")}</div>
          </Button>
        </div>
      </MaxWidth>
    </section>
  );
}
