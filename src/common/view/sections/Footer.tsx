import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import MaxWidth from "../atoms/MaxWidth";
import LinkIcon from "../../../../public/assets/icons/link.svg";

export default function Footer() {
  const [urlCopied, setUrlCopied] = useState(false);
  useEffect(() => {
    if (urlCopied) {
      const t = setTimeout(() => setUrlCopied(false), 5000);
      return () => clearTimeout(t);
    }
  }, [urlCopied, setUrlCopied]);

  function copyUrl() {
    const url = "https://www.votaja.com/";
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
  }
  return (
    <section className="bg-gray-100 pt-12 pb-12">
      <MaxWidth>
        <p className="text-xl text-center italic font-bold uppercase text-gray-600">
          VotaJa
        </p>
        <p className="pt-6 text-xs text-center leading-relaxed text-gray-600">
          És un projecte de <a>Pancripto Labs</a>, fet per Arnau Gómez. Es pronuncia com tu vulguis.
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
              Proposa millora
            </a>
          </Button>
          <Button
            variant="subtle"
            onClick={copyUrl}
            color="primary"
            fullWidth
            className="flex-1 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="h-4 w-4">
                <LinkIcon />
              </div>
              {urlCopied ? <div>Copiat!</div> : <div>Comparteix</div>}
            </div>
          </Button>
        </div>
      </MaxWidth>
    </section>
  );
}
