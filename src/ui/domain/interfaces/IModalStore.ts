import { ModalData } from '../models/ModalData';

export interface IModalStore {
  modal: ModalData
  setModal(m: ModalData):void
  clearModal(): void
}