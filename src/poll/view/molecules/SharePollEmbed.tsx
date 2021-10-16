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
    const embed = `
    <iframe id="votaja-poll"
       title="Enquesta votaja: ${poll.title}"
       width="400"
       height="600"
       src="https://www.votaja.com/v/${poll.slug}">
    </iframe>`
    navigator.clipboard.writeText(embed);
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
