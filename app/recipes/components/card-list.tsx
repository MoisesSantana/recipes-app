import { handleFetchAllRecipes } from '@/services/fetch';
import { usePathname } from 'next/navigation';
import { useQuery } from 'react-query';
import { Card } from './card';
import { Recipe } from '../types';

export function CardList() {
  const pathname = usePathname();
  const dataKey = pathname.split('/')[2];

  const { isLoading, error, data } = useQuery('fetchAllRecipes', () => handleFetchAllRecipes(pathname));

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${(error as Error).message}`;

  const mealOrDrink = dataKey === 'meals' ? 'Meal' : 'Drink';

  return (
    // <div className='flex p-2 flex-row flex-wrap justify-between gap-1'>
    <div className='grid p-2 grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
      {data[dataKey].map((recipe: Recipe) => (
        <Card key={recipe[`id${mealOrDrink}`]} mealOrDrink={mealOrDrink} recipe={recipe} />
      ))}
    </div>
  );
}
