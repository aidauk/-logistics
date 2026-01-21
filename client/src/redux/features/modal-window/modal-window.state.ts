import { ModalWindowTypes } from "./modal-window.types";

export interface ModalWindowState {
  active: boolean;
  type: ModalWindowTypes | null;
  item: string;
}
