import { IModalStore } from "./domain/interfaces/IModalStore";
import { useModalStoreDep } from "./view/store/modalStore";

export const useModalStore: () => IModalStore = useModalStoreDep;
