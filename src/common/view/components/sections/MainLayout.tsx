import React from "react";
import { useModalStore } from "../../../../ui/view/store/modalStore";
import { CProps } from "../../view-models/CProps";
import Footer from "./Footer";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("../../../../ui/view/components/Modal"));

export default function MainLayout({ children }: CProps) {
  const { modal } = useModalStore();
  return (
    <>
      <header></header>
      <main>
        {modal && <Modal />}
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
