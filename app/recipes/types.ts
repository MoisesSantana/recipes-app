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

export type Recipe = MealRecipe & DrinkRecipe;
