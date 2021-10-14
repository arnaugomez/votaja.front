import React from "react";
import { CProps } from "../view-models/CProps";

export default function H2({ children }: CProps) {
  return <h2 className="py-2 text-4xl font-medium leading-tight">{children}</h2>;
}
