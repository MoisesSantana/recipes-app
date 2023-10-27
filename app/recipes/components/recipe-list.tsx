import { handleFetchAllRecipes, handleFetchFilteredRecipes, handleFetchRecipesByCategory } from '@/services/fetch';
import { usePathname } from 'next/navigation';
import { useQuery } from 'react-query';
import { RecipeCard } from './recipe-card';
import { Recipe } from '../types';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

type Search = {
  search: string;
  searchType: string;
}

type RecipeListProps = {
  category: string;
  search: Search;
}

export function RecipeList({ category, search }: RecipeListProps) {
  const pathname = usePathname();
  const dataKey = pathname.split('/')[2];
  const { searchType, search: searchValue } = search;

  const { isLoading, error, data } = useQuery(
    ['fetchRecipes', pathname, category, searchType, searchValue],
    () => {
      if (category === 'All' && searchValue.length === 0) return handleFetchAllRecipes(pathname);
      if (category !== 'All' && searchValue.length === 0) return handleFetchRecipesByCategory(pathname, category);
      return handleFetchFilteredRecipes(pathname, searchType, searchValue);
    }
  );


  if (isLoading) return <Loading />;
  if (error) return <Error message='Request Error' />;
  const mealOrDrink = dataKey === 'meals' ? 'Meal' : 'Drink';
  if (data[dataKey] === null) return <Error message='No results found' />;

  return (
    <div className='grid p-2 grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
      {data[dataKey].map((recipe: Recipe) => (
        <RecipeCard key={recipe[`id${mealOrDrink}`]} mealOrDrink={mealOrDrink} recipe={recipe} />
      ))}
    </div>
  );
}
