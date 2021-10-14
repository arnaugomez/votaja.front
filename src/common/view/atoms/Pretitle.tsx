import React from "react";
import { CCnProps } from "../view-models/CProps";

export default function Pretitle({ children, className }: CCnProps) {
  return (
    <p className={"text-primary text-sm font-medium " + className}>{children}</p>
  );
}
