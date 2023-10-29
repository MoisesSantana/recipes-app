import { Error } from '@/components/error';
import { Loading } from '@/components/loading';
import { handleFetchRecipeDetails } from '@/services/fetch';
import { useCurrentRecipe } from '@/zustand/current-recipe';
import { useFinishedStore } from '@/zustand/finished';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

type IngredientAndMeasureType = {
  ingredient: string;
  measure: string;
}[]

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
      const [recipe] = data[dataKey];
      const mealOrDrink = dataKey === 'meals' ? 'Meal' : 'Drink';
  
      const currentRecipe = {
        id: recipe[`id${mealOrDrink}`],
        name: recipe[`str${mealOrDrink}`],
        thumb: recipe[`str${mealOrDrink}Thumb`],
      };
  
      setCurrentRecipe(currentRecipe);
    }
  }, [isLoading]);
    
  if (isLoading) return <Loading />;
  if (error) return <Error message='Request Error' />;
  const mealOrDrink = dataKey === 'meals' ? 'Meal' : 'Drink';
  const [recipe] = data[dataKey];

  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => key.includes('strIngredient') && value)
    .map(([key, value]) => [key[key.length - 1], value] as [string, string]);
    
  const measures = Object.entries(recipe)
    .filter(([key, value]) => key.includes('strMeasure') && value)
    .map(([key, value]) => [key[key.length - 1], value] as [string, string]);

  const ingredientsAndMeasures: IngredientAndMeasureType = ingredients.map(([key, value]) => {
    const measure = measures.find(([measureKey]) => measureKey === key);
    return {
      ingredient: value,
      measure: measure ? measure[1] : 'to taste',
    };
  });

  const isFinished = finishedRecipes.some((finishedRecipe) => finishedRecipe.id === id);

  const currentRecipe = {
    id: recipe[`id${mealOrDrink}`],
    name: recipe[`str${mealOrDrink}`],
    thumb: recipe[`str${mealOrDrink}Thumb`],
  };

  const handleFinished = () => {
    if (isFinished) setFinishedRecipes(finishedRecipes.filter((finishedRecipe) => finishedRecipe.id !== id));
    else setFinishedRecipes([...finishedRecipes, currentRecipe]);
  };

  return (
    <main className='relative pb-12 flex flex-col md:flex-row md:items-center md:h-[calc(100vh-80px)]'>
      <Image
        src={recipe[`str${mealOrDrink}Thumb`]}
        alt={recipe[`str${mealOrDrink}`]}
        width={400}
        height={400}
        priority
        className='w-full md:w-80 md:h-72 md:ml-2 md:rounded-md lg:w-96 lg:h-80'
      />
      <div className='px-2 md:h-72 lg:h-80 flex flex-col md:gap-3 gap-8 justify-between'>
        <div className='border-b-2'>
          <h2 className='text-neutral-600 text-lg font-bold'>{recipe[`str${mealOrDrink}`]}</h2>
          <h3 className='text-neutral-600'>Category: {recipe.strCategory}</h3>
        </div>
      
        <div>
          <h3 className='text-neutral-600 text-lg font-bold'>Ingredients</h3>
          <ul className='overflow-y-auto md:h-20'>
            {
              ingredientsAndMeasures.map(({ ingredient, measure }: { ingredient: string, measure: string }) => (
                <li className='text-neutral-600' key={`${ingredient}-${measure}`}>{ingredient} - {measure}</li>
              ))
            }
          </ul>
        </div>

        <div>
          <h3 className='text-neutral-600 text-lg font-bold'>Instructions</h3>
          <div className='overflow-y-auto md:h-20'>
            <p className='text-neutral-600'>{recipe.strInstructions}</p>
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