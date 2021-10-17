import React from "react";
import Pretitle from "../../../common/view/atoms/Pretitle";
import HeroImg from "../../../landing/view/atoms/HeroImg";
import { Poll } from "../../domain/models/Poll";

interface Props {
  poll: Poll;
  showDescription: boolean;
}

export default function VoteHero({
  poll: { title, description, votes, votesMax, name },
  showDescription,
}: Props) {
  const voters = `Han votat ${votes.length} ${
    votesMax ? `de ${votesMax} ` : ""
  }persones`;
  return (
    <div className="pb-6">
      <HeroImg />
      <p className="pt-2 uppercase text-xxs font-medium text-gray-500">
        Enquesta {name ? `creada per ${name}` : `creada amb Votaja`}
      </p>
      <h1 className="pt-6 pb-2 font-medium leading-none text-3xl">{title}</h1>
      <Pretitle className="pb-4">{voters}</Pretitle>
      {showDescription && description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
