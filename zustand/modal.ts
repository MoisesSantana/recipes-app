import { create } from 'zustand';

type ModalState = {
  openSearchModal: boolean;
  openCategoryModal: boolean;
};

type ModalAction = {
  setOpenSearchModal: () => void;
  setOpenCategoryModal: () => void;
}

export const useModalStore = create<ModalState & ModalAction>((set) => ({
  openSearchModal: false,
  openCategoryModal: false,
  setOpenSearchModal: () => set((state) => ({ openSearchModal: !state.openSearchModal })),
  setOpenCategoryModal: () => set((state) => ({ openCategoryModal: !state.openCategoryModal })),
}));

