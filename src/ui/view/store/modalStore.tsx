import { CProps } from "../../../common/view/view-models/CProps";
import { ModalData } from "../../domain/models/ModalData";
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
} from "react";
import { IModalStore } from "../../domain/interfaces/IModalStore";

const ModalContext = createContext<ModalData>(null);
const SetModalContext =
  createContext<Dispatch<SetStateAction<ModalData>>>(null);

export function ModalProvider({ children }: CProps) {
  const [modal, setModal] = useState<ModalData>(null);
  return (
    <ModalContext.Provider value={modal}>
      <SetModalContext.Provider value={setModal}>
        {children}
      </SetModalContext.Provider>
    </ModalContext.Provider>
  );
}

export function useModalStoreDep(): IModalStore {
  const modal = useContext(ModalContext);
  const setModal = useContext(SetModalContext);
  const clearModal = useCallback(() => setModal(null), [setModal]);

  return { modal, setModal, clearModal };
}
