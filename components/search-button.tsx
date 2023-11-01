import { ModalTypes } from '@/types/modal-types';
import { useModalStore } from '@/store/modal';
import { MagnifyingGlass } from '@phosphor-icons/react';

export function SearchButton() {
  const setSelectedModal = useModalStore((state) => state.setSelectedModal);
  const setOpenSearchModal = useModalStore((state) => state.setOpenSearchModal);

  return (
    <button
      onClick={ () => {
        setSelectedModal(ModalTypes.SEARCH);
        setOpenSearchModal();
      }}
    >
      <MagnifyingGlass size={32} fill='white' />
    </button>
  );
}