import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';
import { Titles } from '../enums';

type ModalContainerProps = {
  title: Titles;
  children: React.ReactNode;
  setOpenModal: () => void;
}

export function ModalContainer({ title, children, setOpenModal }:ModalContainerProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={modalRef}
      className="relative z-20"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      tabIndex={0}
      onKeyDown={({ key }) => key === 'Escape' && setOpenModal()}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <button
              type="button"
              className="absolute right-2 top-2"
              aria-label="Close"
              onClick={setOpenModal}
            >
              <X fill='red' size={24} weight='bold' />
            </button>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-center">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                  <MagnifyingGlass size={32} />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
                </div>
              </div>
            </div>
            { children }
          </div>
        </div>
      </div>
    </div>
  );
}