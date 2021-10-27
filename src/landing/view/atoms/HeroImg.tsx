import React from "react";
import { useTranslation } from "react-i18next";
import SImg from "../../../common/view/components/atoms/SImg";

export default function HeroImg() {
  const { t } = useTranslation("common");
  return (
    <figure className="relative h-20 overflow-hidden rounded">
      <SImg
        suppressHydrationWarning={true}
        priority={true}
        placeholder="blur"
        alt={t("heroImgAlt")}
        layout="fill"
        objectFit="cover"
      />
    </figure>
  );
}
