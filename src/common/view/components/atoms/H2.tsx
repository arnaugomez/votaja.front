import React from "react";
import { CCnProps } from "../../view-models/CProps";

export default function H2({ children, className }: CCnProps) {
  return (
    <h2 className={"py-2 text-2xl font-medium leading-tight " + className}>
      {children}
    </h2>
  );
}
