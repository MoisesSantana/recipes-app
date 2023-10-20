import { handleFetchAllRecipes } from '@/services/fetch';
import { usePathname } from 'next/navigation';
import { useQuery } from 'react-query';

type MealRecipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type DrinkRecipe = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

type Recipe = MealRecipe & DrinkRecipe;

export function CardList() {
  const pathname = usePathname();
  const dataKey = pathname.split('/')[2];

  const { isLoading, error, data } = useQuery('fetchAllRecipes', () => handleFetchAllRecipes(pathname));

  if (isLoading) return 'Loading...';
  if (error) return `An error has occurred: ${(error as Error).message}`;

  const mealOrDrink = dataKey === 'meals' ? 'Meal' : 'Drink';

  return (
    <div>
      {data[dataKey].map((recipe: Recipe) => (
        <div key={recipe[`id${mealOrDrink}`]}>
          <h2>{recipe[`str${mealOrDrink}`]}</h2>
          <img src={recipe[`str${mealOrDrink}Thumb`]} alt={recipe[`str${mealOrDrink}`]} />
        </div>
      ))}
    </div>
  );
}
