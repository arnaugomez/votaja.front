import React from "react";
import { CCnProps } from "../view-models/CProps";

export default function Description({ children, className }: CCnProps) {
  return <p className={"text-sm text-gray-700 " + className}>{children}</p>;
}
