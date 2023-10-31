import { Recipe } from '@/services/fetch';
import { usePathname } from 'next/navigation';
import { useQuery } from 'react-query';
import { RecipeCard } from './recipe-card';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';
import { Search } from '../types';
import { useModalStore } from '@/zustand/modal';
import { switchRequest } from '@/services/recipe-list-request';
import { ModalTypes } from '@/zustand/enums';

type RecipeListProps = {
  category: string;
  search: Search;
  isExplore: boolean;
}

export function RecipeList({ category, search }: RecipeListProps) {
  const pathname = usePathname();
  const isExplorePage = pathname.includes('explore');
  const { searchType, search: searchValue } = search;

  const selectedModal = useModalStore((state) => state.selectedModal);
  const explorePath = selectedModal === ModalTypes.DRINKS_INGREDIENT ? 'drinks' : 'meals';

  const { isLoading, error, data } = useQuery(
    ['fetchRecipes', pathname, category, searchType, searchValue],
    () => switchRequest(pathname, selectedModal, category, searchType, searchValue),
  );

  if (isLoading) return <Loading />;
  if (error) return <Error message='Request Error' />;
  if (data === null && isExplorePage) return <Error message='Select a filter' />;
  if (data === null) return <Error message='No results found' />;
  
  return (
    <div className='grid py-2 grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 bg-rose-50'>
      {data && data.map((recipe: Recipe) => (
        <RecipeCard
          key={recipe.id}
          url={ isExplorePage ? `/recipes/${explorePath}/${recipe.id}` : `${pathname}/${recipe.id}`}
          recipe={recipe}
        />
      ))}
    </div>
  );
}
