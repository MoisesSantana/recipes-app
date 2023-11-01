import { Error } from '@/components/error';
import { Loading } from '@/components/loading';
import { handleFetchAllCategories, handleFetchAreas, handleFetchIngredients } from '@/services/fetch';
import { ModalTypes } from '@/types/modal-types';
import { useModalStore } from '@/store/modal';
import { usePathname } from 'next/navigation';
import { useQuery } from 'react-query';

type ModalListProps = {
  handleCategory?: (category: string) => void;
}

export function ModalList({ handleCategory }: ModalListProps) {  
  const pathname = usePathname();
  const setListModal = useModalStore((state) => state.setOpenListModal);
  const selectedModal = useModalStore((state) => state.selectedModal);
  const dataKey = selectedModal === ModalTypes.MEALS_INGREDIENT ? 'meals' : 'drinks';

  const isMeal = () => {
    const pathHasMeals = pathname.includes('meals');
    const selectedModalIsMeals = selectedModal === ModalTypes.MEALS_INGREDIENT;

    return pathHasMeals || selectedModalIsMeals && pathname.includes('explore');
  };

  const { isLoading, error, data } = useQuery(
    ['fetchLists', dataKey, selectedModal],
    () => {
      if (selectedModal === ModalTypes.CATEGORY) return handleFetchAllCategories(isMeal());
      if (selectedModal === ModalTypes.MEALS_INGREDIENT || selectedModal === ModalTypes.DRINKS_INGREDIENT) return handleFetchIngredients(dataKey === 'meals');
      return handleFetchAreas();
    }
  );

  if (isLoading) return <Loading />;
  if (error) return <Error message='Request Error' />;

  return (
    <ul className="bg-gray-50 px-4 py-3 flex flex-wrap sm:justify-between justify-center sm:px-6 gap-4 max-h-80 overflow-y-auto">
      { data.map((cur: string) => (
        <li key={cur} className='inline-flex justify-center rounded-md bg-rose-600 w-40 sm:w-52 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500'>
          <button
            className='w-full h-full'
            onClick={ () => {
              if (handleCategory) handleCategory(cur);
              setListModal();
            } }
          >
            {cur}
          </button>
        </li>
      )) }
    </ul>
  );
}