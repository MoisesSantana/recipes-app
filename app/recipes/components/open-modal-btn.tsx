import { Button } from '@/components/button';
import { Buttons, ModalTypes } from '@/types/modal-types';
import { useModalStore } from '@/store/modal';
import { usePathname } from 'next/navigation';

export function OpenModalBtn() {
  const pathname = usePathname();
  const setOpenListModal = useModalStore((state) => state.setOpenListModal);
  const setSelectedModal = useModalStore((state) => state.setSelectedModal);

  if (pathname.includes('explore')) {
    return (
      <div className='flex flex-col gap-1 md:gap-4 md:flex-row items-start'>
        <Button
          onClick={ () => {
            setSelectedModal(ModalTypes.MEALS_INGREDIENT);
            setOpenListModal();
          }}
        >
          { Buttons.MEALS_INGREDIENT }
        </Button>
        <Button
          onClick={ () => {
            setSelectedModal(ModalTypes.DRINKS_INGREDIENT);
            setOpenListModal();
          }}
        >
          { Buttons.DRINKS_INGREDIENT }
        </Button>
        <Button
          onClick={ () => {
            setSelectedModal(ModalTypes.AREA);
            setOpenListModal();
          }}
        >
          { Buttons.MEALS_AREA }
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={ () => {
        setSelectedModal(ModalTypes.CATEGORY);
        setOpenListModal();
      }}
    >
      { Buttons.CATEGORY }
    </Button>
  );
}