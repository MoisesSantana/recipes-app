import { Error } from '@/components/error';
import { Loading } from '@/components/loading';
import { handleFetchRecipeDetails } from '@/services/fetch';
import { useCurrentRecipe } from '@/zustand/current-recipe';
import { useFinishedStore } from '@/zustand/finished';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

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
      setCurrentRecipe({
        id: data.id,
        name: data.name,
        thumb: data.image,
      });
    }
  }, [isLoading]);
    
  if (isLoading || data === undefined) return <Loading />;
  if (error) return <Error message='Request Error' />;

  const isFinished = finishedRecipes.some((finishedRecipe) => finishedRecipe.id === id);

  const currentRecipe = {
    id: data.id,
    name: data.name,
    thumb: data.image,
  };

  const handleFinished = () => {
    if (isFinished) setFinishedRecipes(finishedRecipes.filter((finishedRecipe) => finishedRecipe.id !== id));
    else setFinishedRecipes([...finishedRecipes, currentRecipe]);
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
      <div className='px-2 md:h-72 lg:h-80 flex flex-col md:gap-3 gap-8 justify-between'>
        <div className='border-b-2'>
          <h2 className='text-neutral-600 text-lg font-bold'>{data.name}</h2>
          <h3 className='text-neutral-600'>Category: {data.category}</h3>
        </div>
      
        <div>
          <h3 className='text-neutral-600 text-lg font-bold'>Ingredients</h3>
          <ul className='overflow-y-auto md:h-20'>
            {
              data.ingredientAndMeasures.map(({ ingredient, measure }: { ingredient: string, measure: string }) => (
                <li className='text-neutral-600' key={`${ingredient}-${measure}`}>{ingredient} - {measure}</li>
              ))
            }
          </ul>
        </div>

        <div>
          <h3 className='text-neutral-600 text-lg font-bold'>Instructions</h3>
          <div className='overflow-y-auto md:h-20'>
            <p className='text-neutral-600'>{data.instructions}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleFinished}
        className='fixed top-full py-1 right-0 left-0 mx-2 -translate-y-20 bg-rose-600 z-30 text-white rounded-md'
      >
        { isFinished ? 'unmark as completed' : 'completed this recipe' } I 
      </button>
    </main>
  );
}