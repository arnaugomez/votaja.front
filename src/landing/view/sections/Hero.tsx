import React from "react";
import H1 from "../../../common/view/components/atoms/H1";
import MaxWidth from "../../../common/view/components/atoms/MaxWidth";
import Subtitle from "../../../common/view/components/atoms/Subtitle";
import HeroImg from "../atoms/HeroImg";
import { useTranslation } from "next-i18next";

export default function Hero() {
  const { t } = useTranslation("createPoll");
  return (
    <section className="pt-8 pb-12">
      <MaxWidth>
        <HeroImg />
        <H1 className="pt-4 uppercase font-bold italic leading-none transform -translate-x-2">
          Vota<span className="text-primary">ja</span>
        </H1>
        <Subtitle>{t("hero.slogan")}</Subtitle>
      </MaxWidth>
    </section>
  );
}
