import React from "react";
import H1 from "../atoms/H1";
import MaxWidth from "../atoms/MaxWidth";
import { CProps } from "../view-models/CProps";

export default function MainLayout({ children }: CProps) {
  return (
    <>
      <header>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
