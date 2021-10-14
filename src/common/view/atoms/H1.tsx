import React from "react";
import { CCnProps } from "../view-models/CProps";

export default function H1({ children, className }: CCnProps) {
  return (
    <h1 className={"text-5xl font-medium leading-tight " + className}>
      {children}
    </h1>
  );
}
