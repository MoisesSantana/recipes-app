import { Error } from '@/components/error';
import { Loading } from '@/components/loading';
import { handleFetchAllCategories, handleFetchAreas, handleFetchIngredients } from '@/services/fetch';
import { ModalTypes } from '@/zustand/enums';
import { useModalStore } from '@/zustand/modal';
import { useQuery } from 'react-query';

type ModalListProps = {
  isDrink?: boolean;
  handleCategory?: (category: string) => void;
  setOpenModal: () => void;
}

export function ModalList({ isDrink = false, handleCategory, setOpenModal }: ModalListProps) {
  console.log(setOpenModal);
  const dataKey = isDrink ? 'drinks' : 'meals';

  const selectedModal = useModalStore((state) => state.selectedModal);

  const { isLoading, error, data } = useQuery(
    ['fetchLists', dataKey, selectedModal],
    () => {
      if (selectedModal === ModalTypes.CATEGORY) return handleFetchAllCategories(isDrink);
      if (selectedModal === ModalTypes.INGREDIENT) return handleFetchIngredients(isDrink);
      return handleFetchAreas();
    }
  );

  if (isLoading) return <Loading />;
  if (error) return <Error message='Request Error' />;

  return (
    <ul className="bg-gray-50 px-4 py-3 flex flex-wrap sm:justify-between justify-center sm:px-6 gap-4 max-h-80 overflow-y-auto">
      {
        data.map((cur: string) => (
          <li key={cur} className='inline-flex justify-center rounded-md bg-rose-600 w-40 sm:w-52 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500'>
            <button
              className='w-full h-full'
              onClick={ () => {
                if (handleCategory) handleCategory(cur);
                setOpenModal();
              } }
            >
              {cur}
            </button>
          </li>
        ))
      }
    </ul>
  );
}