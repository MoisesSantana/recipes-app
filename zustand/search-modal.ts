import { create } from 'zustand';

type SearchModalState = {
  openSearchModal: boolean;
};

type SearchModalAction = {
  setOpenSearchModal: () => void;
}

export const useSearchModalStore = create<SearchModalState & SearchModalAction>((set) => ({
  openSearchModal: false,
  setOpenSearchModal: () => set((state) => ({ openSearchModal: !state.openSearchModal })),
}));

