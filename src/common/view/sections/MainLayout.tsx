import React from "react";
import { CProps } from "../view-models/CProps";

export default function MainLayout({ children }: CProps) {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
