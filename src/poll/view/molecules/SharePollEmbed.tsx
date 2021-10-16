import React, { useEffect, useState } from "react";
import Button from "../../../common/view/atoms/Button";
import Description from "../../../common/view/atoms/Description";
import CopyIcon from "../../../../public/assets/icons/copy.svg";
import { Poll } from "../../domain/models/Poll";

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

  function copyUrl() {
    // Todo: change embed string
    const url = "https://votaja.com/p/" + poll.slug;
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
  }
  return (
    <>
      <Description className="text-center pt-10 pb-4">
        O bé copia i enganxa aquest codi <em>embed</em> per mostrar-la a la teva
        pàgina web:
      </Description>
      <Button onClick={copyUrl} fullWidth>
        <div className="flex items-center gap-2">
          <CopyIcon />
          {urlCopied ? <div>Copiat!</div> : <div>Copia l&apos;embed</div>}
        </div>
      </Button>
    </>
  );
}
