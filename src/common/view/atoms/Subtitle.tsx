import React from "react";
import { CCnProps } from "../view-models/CProps";

export default function Subtitle({ children, className }: CCnProps) {
  return (
    <p className={"text-gray-500 text-lg " + className}>{children}</p>
  );
}
