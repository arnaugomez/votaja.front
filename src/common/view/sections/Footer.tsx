import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import MaxWidth from "../atoms/MaxWidth";
import LinkIcon from "../../../../public/assets/icons/link.svg";
import { useTranslation } from "next-i18next";

export default function Footer() {
  const [urlCopied, setUrlCopied] = useState(false);
  useEffect(() => {
    if (urlCopied) {
      const t = setTimeout(() => setUrlCopied(false), 5000);
      return () => clearTimeout(t);
    }
  }, [urlCopied, setUrlCopied]);

  const { t: commonT } = useTranslation("common");
  function copyUrl() {
    const url = `https://www.${commonT("localeUrl")}/`;
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
  }
  const { t } = useTranslation("footer");
  return (
    <section className="bg-gray-100 pt-12 pb-12">
      <MaxWidth>
        <p className="text-xl text-center italic font-bold uppercase text-gray-600">
          VotaJa
        </p>
        <p className="pt-6 text-xs text-center leading-relaxed text-gray-600">
          {t("projectBy")} <a>Pancripto Labs</a>.
        </p>
        <div className="flex space-x-4 pt-8">
          <Button
            variant="subtle"
            color="boring"
            fullWidth
            className="flex-1 text-sm"
          >
            <a
              href="https://github.com/arnaugomez/votaja.front/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("suggestImprovement")}
            </a>
          </Button>
          <Button
            variant="subtle"
            onClick={copyUrl}
            color="primary"
            fullWidth
            className="flex-1 text-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4">
                <LinkIcon />
              </div>
              {urlCopied ? (
                <div>{t("copied")}!</div>
              ) : (
                <div>{t("recommend")}</div>
              )}
            </div>
          </Button>
        </div>
      </MaxWidth>
    </section>
  );
}
