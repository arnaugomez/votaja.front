import React from "react";
import { CProps } from "../view-models/CProps";

export default function H3({children}: CProps) {
  return <h3 className="text-lg font-medium">{children}</h3>;
}
