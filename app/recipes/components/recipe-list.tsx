import { handleFetchAllRecipes, handleFetchRecipesByCategory } from '@/services/fetch';
import { usePathname } from 'next/navigation';
import { useQuery } from 'react-query';
import { RecipeCard } from './recipe-card';
import { Recipe } from '../types';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

type RecipeListProps = {
  category: string;
}

export function RecipeList({ category }: RecipeListProps) {
  const pathname = usePathname();
  const dataKey = pathname.split('/')[2];

  const { isLoading, error, data } = useQuery(
    ['fetchAllRecipes', pathname, category],
    () => category === 'All' ? handleFetchAllRecipes(pathname) : handleFetchRecipesByCategory(pathname, category)
  );

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  const mealOrDrink = dataKey === 'meals' ? 'Meal' : 'Drink';

  return (
    <div className='grid p-2 grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
      {data[dataKey].map((recipe: Recipe) => (
        <RecipeCard key={recipe[`id${mealOrDrink}`]} mealOrDrink={mealOrDrink} recipe={recipe} />
      ))}
    </div>
  );
}
