import React from "react";
import H1 from "../../../common/view/atoms/H1";
import MaxWidth from "../../../common/view/atoms/MaxWidth";
import SImg from "../../../common/view/atoms/SImg";
import Subtitle from "../../../common/view/atoms/Subtitle";

export default function Hero() {
  return (
    <section className="pt-8 pb-12">
      <MaxWidth>
        <figure className="relative h-20 overflow-hidden rounded">
          <SImg layout="fill" objectFit="cover" />
        </figure>
        <H1 className="pt-4 uppercase font-bold italic leading-none transform -translate-x-2">
          Vota<span className="text-primary">ja</span>
        </H1>
        <Subtitle>Crea la teva enquesta en segons.</Subtitle>
      </MaxWidth>
    </section>
  );
}
