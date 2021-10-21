import React, { useEffect, useState } from "react";
import { IModalStore } from "../../domain/interfaces/IModalStore";
import { useModalStore } from "../store/modalStore";
import ModalHeader from "./ModalHeader";

enum Opacity {
  Opacity0 = "opacity-0",
  Opacity80 = "opacity-80",
}

export default function Modal() {
  const { modal, clearModal }: IModalStore = useModalStore();
  const [opacity, setOpacity] = useState(Opacity.Opacity0);

  useEffect(() => {
    if (modal) {
      let timeout = setTimeout(() => {
        setOpacity(Opacity.Opacity80);
      }, 10);
      return () => clearTimeout(timeout);
    } else {
      setOpacity(Opacity.Opacity0);
    }
  }, [modal]);

  if(!modal) {
    return null
  }

  return (
    <section className="fixed z-20 inset-0 transition-all flex items-center justify-center py-8 px-2">
      <button
        className={
          "absolute inset-0 w-full h-full appearance-none bg-gray-900 cursor-default " +
          opacity
        }
        aria-label="Close modal"
        onClick={clearModal}
      />
      <article className="relative w-full max-h-full flex flex-col max-w-md bg-white rounded-xl p-3 space-y-2">
        <ModalHeader onClose={clearModal}>{modal.title}</ModalHeader>
        <div className="flex-1 overflow-y-auto p-1">{modal.content}</div>
      </article>
    </section>
  );
}
