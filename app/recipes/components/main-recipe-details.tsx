import { Error } from '@/components/error';
import { Loading } from '@/components/loading';
import { handleFetchRecipeDetails } from '@/services/fetch';
import { useCurrentRecipe } from '@/store/current-recipe';
import { useFinishedStore } from '@/store/finished';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { RecipeDetailsInfo } from './recipe-details-info';

export function MainRecipeDetails() {
  const { id } = useParams();
  const pathname = usePathname();
  const dataKey = pathname.split('/')[2];

  const finishedMealsRecipes = useFinishedStore((state) => state.meals);
  const setFinishedMealsRecipes = useFinishedStore((state) => state.setMeals);
  const finishedDrinksRecipes = useFinishedStore((state) => state.drinks);
  const setFinishedDrinksRecipes = useFinishedStore((state) => state.setDrinks);
  const setCurrentRecipe = useCurrentRecipe((state) => state.setCurrentRecipe);

  const finishedRecipes = dataKey === 'meals' ? finishedMealsRecipes : finishedDrinksRecipes;
  const setFinishedRecipes = dataKey === 'meals' ? setFinishedMealsRecipes : setFinishedDrinksRecipes;

  
  const { isLoading, error, data } = useQuery(
    ['fetchRecipeDetails', pathname, id],
    () => handleFetchRecipeDetails(pathname, id as string),
  );

  useEffect(() => {
    if (!isLoading && !error && data) {  
      setCurrentRecipe(data);
    }
  }, [isLoading]);
    
  if (isLoading || data === undefined) return <Loading />;
  if (error) return <Error message='Request Error' />;

  const isFinished = finishedRecipes.some((finishedRecipe) => finishedRecipe.id === id);

  const handleFinished = () => {
    if (isFinished) setFinishedRecipes(finishedRecipes.filter((finishedRecipe) => finishedRecipe.id !== id));
    else setFinishedRecipes([...finishedRecipes, data]);
  };

  return (
    <main className='relative pb-12 flex flex-col md:flex-row md:items-center md:h-[calc(100vh-80px)]'>
      <Image
        src={data.image}
        alt={data.name}
        width={400}
        height={400}
        priority
        className='w-full md:w-80 md:h-72 md:ml-2 md:rounded-md lg:w-96 lg:h-80'
      />
      <RecipeDetailsInfo data={data} />
      <button
        onClick={handleFinished}
        className='fixed top-full py-1 right-0 left-0 mx-2 -translate-y-20 bg-rose-600 z-30 text-white rounded-md'
      >
        { isFinished ? 'unmark as completed' : 'completed this recipe' } I 
      </button>
    </main>
  );
}