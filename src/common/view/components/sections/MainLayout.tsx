import React from "react";
import { CProps } from "../../view-models/CProps";
import Footer from "./Footer";
import dynamic from "next/dynamic";
import { withDeps } from "../../hocs/withDeps";
import { useModalStore } from "src/ui/uiModule";
import { IModalStore } from "src/ui/domain/interfaces/IModalStore";
const Modal = dynamic(() => import("../../../../ui/view/components/Modal"));

interface Props extends CProps {
  useModalStore(): IModalStore;
}

function MainLayout({ children, useModalStore }: Props) {
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

export default withDeps(MainLayout)({ useModalStore });
