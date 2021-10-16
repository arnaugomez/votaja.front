import React, { useEffect, useState } from "react";
import Button from "../../../common/view/atoms/Button";
import Description from "../../../common/view/atoms/Description";
import MaxWidth from "../../../common/view/atoms/MaxWidth";
import CopyIcon from "../../../../public/assets/icons/copy.svg";
import LinkIcon from "../../../../public/assets/icons/link.svg";
import { Poll } from "../../domain/models/Poll";
import H2 from "../../../common/view/atoms/H2";
import CelebrationImg from "../atoms/CelebrationImg";
import JSConfetti from "js-confetti";

interface Props {
  poll: Poll;
}

export default function SharePoll({ poll }: Props) {
  const [urlCopied, setUrlCopied] = useState(false);

  useEffect(() => new JSConfetti().addConfetti(), []);
  useEffect(() => {
    if (urlCopied) {
      const t = setTimeout(() => setUrlCopied(false), 5000);
      return () => clearTimeout(t);
    }
  }, [urlCopied, setUrlCopied]);

  function copyUrl() {
    const url = "https://votaja.com/p/" + poll.slug;
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
  }

  return (
    <section className="pb-10">
      <MaxWidth>
        <div className="py-6 px-4 bg-gray-50 rounded-2xl">
          <CelebrationImg />
          <H2 className="text-center pb-4">Enquesta creada</H2>
          <Description className="text-center pb-4">
            Comparteix-la per Whatsapp i a les xarxes:
          </Description>
          <Button onClick={copyUrl} fullWidth>
            <div className="flex items-center gap-2">
              <LinkIcon />
              {urlCopied ? <div>Copiat!</div> : <div>Copia l&apos;enllaç</div>}
            </div>
          </Button>

          <Description className="text-center pt-10 pb-4">
            O bé copia i enganxa aquest codi <em>embed</em> per mostrar-la a la
            teva pàgina web:
          </Description>
          <Button fullWidth>
            <div className="flex items-center gap-2">
              <CopyIcon />
              <div>Copia l&apos;embed</div>
            </div>
          </Button>
        </div>
      </MaxWidth>
    </section>
  );
}
