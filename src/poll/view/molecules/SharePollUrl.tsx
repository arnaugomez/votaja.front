import React, { useEffect, useState } from "react";
import Button from "../../../common/view/atoms/Button";
import Description from "../../../common/view/atoms/Description";
import LinkIcon from "../../../../public/assets/icons/link.svg";
import { Poll } from "../../domain/models/Poll";

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

  function copyUrl() {
    const url = "https://www.votaja.com/v/" + poll.slug;
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
  }
  return (
    <>
      <Description className="text-center pb-4">
        Comparteix-la per Whatsapp i a les xarxes:
      </Description>
      <Button onClick={copyUrl} fullWidth>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4">
            <LinkIcon />
          </div>
          {urlCopied ? <div>Copiat!</div> : <div>Copia l&apos;enllaç</div>}
        </div>
      </Button>
    </>
  );
}
