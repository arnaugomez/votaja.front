import React from "react";
import { CCnProps } from "../view-models/CProps";

export default function H3({children, className}: CCnProps) {
  return <h3 className={"text-lg font-medium " + className}>{children}</h3>;
}
