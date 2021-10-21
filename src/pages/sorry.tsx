import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useTranslation } from "react-i18next";
import MaxWidth from "../common/view/components/atoms/MaxWidth";
import MainLayout from "../common/view/components/sections/MainLayout";
import Hero from "../landing/view/sections/Hero";
import CogIcon from "@icons/cog";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "footer",
        "createPoll",
      ])),
    },
  };
}

export default function MaintenancePage() {
  const { t } = useTranslation("common");
  return (
    <MainLayout>
      <Hero />
      <MaxWidth>
        <div className="flex flex-col space-y-2 items-center text-center text-sm text-gray-700 pb-20">
          <div className="animate-bounce">
            <CogIcon />
          </div>
          <div>{t("maintenance")}</div>
        </div>
      </MaxWidth>
    </MainLayout>
  );
}
