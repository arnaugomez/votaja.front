import React from "react";
import { CProps } from "../view-models/CProps";

export default function H1({ children }: CProps) {
  return <h1 className="text-5xl font-medium leading-tight">{children}</h1>;
}
