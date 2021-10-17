import React, { useEffect, useState } from "react";
import Button from "../../../common/view/atoms/Button";
import Description from "../../../common/view/atoms/Description";
import LinkIcon from "../../../../public/assets/icons/link.svg";
import { Poll } from "../../domain/models/Poll";
import { useTranslation } from "next-i18next";

interface Props {
  poll: Poll;
}

export default function SharePollUrl({ poll }: Props) {
  const [urlCopied, setUrlCopied] = useState(false);
  useEffect(() => {
    if (urlCopied) {
      const t = setTimeout(() => setUrlCopied(false), 5000);
      return () => clearTimeout(t);
    }
  }, [urlCopied, setUrlCopied]);

  const { t } = useTranslation("common");

  function copyUrl() {
    const url = `https://www.${t("localeUrl")}/v/` + poll.slug;
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
  }

  return (
    <>
      <Description className="text-center pb-4">
        {t("sharePollUrl.description")}
      </Description>
      <Button onClick={copyUrl} fullWidth>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4">
            <LinkIcon />
          </div>
          {urlCopied ? (
            <div>{t("copied")}</div>
          ) : (
            <div>{t("sharePollUrl.copyLink")}</div>
          )}
        </div>
      </Button>
    </>
  );
}
