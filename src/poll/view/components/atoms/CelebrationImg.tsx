import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import SImg from "../../../../common/view/components/atoms/SImg";
import Mesh1 from "/public/assets/img/party/party-1.png";
import Mesh2 from "/public/assets/img/party/party-2.png";
import Mesh3 from "/public/assets/img/party/party-3.png";
import Mesh4 from "/public/assets/img/party/party-4.png";

const fallbackMap: Record<1 | 2 | 3 | 4, StaticImageData> = {
  1: Mesh1,
  2: Mesh2,
  3: Mesh3,
  4: Mesh4,
};

export default function CelebrationImg() {
  const src = useMemo(() => fallbackMap[Math.floor(Math.random() * 4) + 1], []);

  const { t } = useTranslation("common");
  return (
    <div className="flex justify-center pb-2">
      <SImg src={src} alt={t("celebrationImgAlt")} height={60} width={60} />
    </div>
  );
}
