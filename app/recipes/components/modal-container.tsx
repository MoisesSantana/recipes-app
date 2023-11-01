import { useModalStore } from '@/store/modal';
import { X } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';

type ModalContainerProps = {
  children: React.ReactNode;
}

export function ModalContainer({ children }:ModalContainerProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const setOpenListModal = useModalStore((state) => state.setOpenListModal);
  const setOpenSearchModal = useModalStore((state) => state.setOpenSearchModal);
  const openListModal = useModalStore((state) => state.openListModal);

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
      onKeyDown={({ key }) => {
        if (key === 'Escape') {
          openListModal ? setOpenListModal() : setOpenSearchModal();
        }
      }}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <button
              type="button"
              className="absolute right-2 top-2"
              aria-label="Close"
              onClick={openListModal ? setOpenListModal : setOpenSearchModal}
            >
              <X fill='red' size={24} weight='bold' />
            </button>
            { children }
          </div>
        </div>
      </div>
    </div>
  );
}