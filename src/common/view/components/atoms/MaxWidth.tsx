import React from "react";
import { CProps } from "../../view-models/CProps";

export default function MaxWidth({ children }: CProps) {
  return <div className="max-w-5xl px-4 mx-auto">{children}</div>;
}
