import { ModalTypes, Titles } from '@/types/modal-types';
import { useModalStore } from '@/store/modal';
import { MagnifyingGlass } from '@phosphor-icons/react';

export function ModalTitle() {
  const selectedModal = useModalStore((state) => state.selectedModal);

  function switchTitle() {
    switch (selectedModal) {
    case ModalTypes.MEALS_INGREDIENT || ModalTypes.DRINKS_INGREDIENT:
      return Titles.INGREDIENTS;
    case ModalTypes.AREA:
      return Titles.AREA;
    case ModalTypes.CATEGORY:
      return Titles.CATEGORY;
    default:
      return Titles.SEARCH;
    }
  }

  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-center">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
          <MagnifyingGlass size={32} />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{switchTitle()}</h3>
        </div>
      </div>
    </div>
  );
}