import { create } from 'zustand';
import { ModalTypes } from './enums';

type ModalState = {
  openSearchModal: boolean;
  openListModal: boolean;
  selectedModal: ModalTypes | '';
};

type ModalAction = {
  setOpenSearchModal: () => void;
  setOpenListModal: () => void;
  setSelectedModal: (selectedModal: ModalTypes) => void;
};

export const useModalStore = create<ModalState & ModalAction>((set) => ({
  openSearchModal: false,
  openListModal: false,
  selectedModal: '',
  setOpenSearchModal: () => set((state) => ({ openSearchModal: !state.openSearchModal })),
  setOpenListModal: () => set((state) => ({ openListModal: !state.openListModal })),
  setSelectedModal: (selectedModal: ModalTypes) => set(() => ({ selectedModal })),
}));

