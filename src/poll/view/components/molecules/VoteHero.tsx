import React from "react";
import Pretitle from "../../../../common/view/components/atoms/Pretitle";
import HeroImg from "../../../../landing/view/atoms/HeroImg";
import { Poll } from "../../../domain/models/Poll";
import { useTranslation } from "next-i18next";

interface Props {
  poll: Poll;
  showDescription: boolean;
}

export default function VoteHero({
  poll: { title, description, votes, votesMax, name },
  showDescription,
}: Props) {
  const { t } = useTranslation("votePoll");

  const voters = `${t("hero.haveVoted")} ${votes.length} ${
    votesMax ? `de ${votesMax} ` : ""
  }${t("people")}`;
  return (
    <div className="pb-6">
      <HeroImg />
      <p className="pt-2 uppercase text-xxs font-medium text-gray-500">
        {t("poll")}{" "}
        {name ? `${t("hero.createdBy")} ${name}` : t("hero.createdWith")}
      </p>
      <h1 className="pt-6 pb-2 font-medium leading-9 text-3xl">{title}</h1>
      <Pretitle className="pb-4">{voters}</Pretitle>
      {showDescription && description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
