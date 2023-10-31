import { Button } from '@/components/button';
import { ModalTypes } from '@/zustand/enums';
import { useModalStore } from '@/zustand/modal';

type OpenModalBtnProps = {
  isExplorePage: boolean;
}

enum Titles {
  MEALS_INGREDIENT = 'Meals Ingredients',
  DRINKS_INGREDIENT = 'Drinks Ingredients',
  MEALS_AREA = 'Meals Area',
  CATEGORY = 'Categories',
}

export function OpenModalBtn({ isExplorePage }: OpenModalBtnProps) {
  const setOpenListModal = useModalStore((state) => state.setOpenListModal);
  const setSelectedModal = useModalStore((state) => state.setSelectedModal);

  if (isExplorePage) {
    return (
      <div className='flex h-full flex-col gap-4 md:flex-row items-start'>
        <Button
          onClick={ () => {
            setSelectedModal(ModalTypes.MEALS_INGREDIENT);
            setOpenListModal();
          }}
        >
          { Titles.MEALS_INGREDIENT }
        </Button>
        <Button
          onClick={ () => {
            setSelectedModal(ModalTypes.DRINKS_INGREDIENT);
            setOpenListModal();
          }}
        >
          { Titles.DRINKS_INGREDIENT }
        </Button>
        <Button
          onClick={ () => {
            setSelectedModal(ModalTypes.AREA);
            setOpenListModal();
          }}
        >
          { Titles.MEALS_AREA }
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
      { Titles.CATEGORY }
    </Button>
  );
}