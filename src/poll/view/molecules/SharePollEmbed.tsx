import React, { useEffect, useState } from "react";
import Button from "../../../common/view/atoms/Button";
import Description from "../../../common/view/atoms/Description";
import CopyIcon from "../../../../public/assets/icons/copy.svg";
import { Poll } from "../../domain/models/Poll";
import { useTranslation } from "next-i18next";

interface Props {
  poll: Poll;
}

export default function SharePollEmbed({ poll }: Props) {
  const [urlCopied, setUrlCopied] = useState(false);
  useEffect(() => {
    if (urlCopied) {
      const t = setTimeout(() => setUrlCopied(false), 5000);
      return () => clearTimeout(t);
    }
  }, [urlCopied, setUrlCopied]);

  const { t: commonT } = useTranslation("common");
  function copyUrl() {
    const embed = `
    <iframe id="votaja-poll"
       title="Enquesta votaja: ${poll.title}"
       width="400"
       height="600"
       src="https://www.${commonT('localeUrl')}/v/${poll.slug}">
    </iframe>`;
    navigator.clipboard.writeText(embed);
    setUrlCopied(true);
  }

  const { t } = useTranslation("createPoll");
  return (
    <>
      <Description className="text-center pt-10 pb-4">
        {t("share.embed1")} <em>embed</em> {t("share.embed2")}
      </Description>
      <Button onClick={copyUrl} fullWidth>
        <div className="flex items-center space-x-2">
          <CopyIcon />
          {urlCopied ? (
            <div>{t("copied")}</div>
          ) : (
            <div>{t("share.copyEmbed")}</div>
          )}
        </div>
      </Button>
    </>
  );
}
