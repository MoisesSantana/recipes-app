import { SearchType } from '@/app/recipes/types';

const URL_BASIS_MEAL = 'https://www.themealdb.com/api/json/v1/1/';
const URL_BASIS_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

type MealRecipe = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
  strCategory: string,
};

type DrinkRecipe = {
  idDrink: string,
  strDrink: string,
  strDrinkThumb: string,
  strCategory: string,
};

type RecipeData = {
  meals: MealRecipe[],
  drinks: DrinkRecipe[],
}

type RecipeDetailsData = {
  [key: string]: string,
}

export type Recipe = {
  id: string,
  name: string,
  image: string,
  category: string,
}

const formatUrl = (isMeal: boolean) => isMeal ? URL_BASIS_MEAL : URL_BASIS_DRINK;

function formatRecipes(isMeal: boolean, data: RecipeData) {
  if (isMeal) {
    return data.meals.map((meal: MealRecipe) => ({
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
    }));
  }

  return data.drinks.map((drink: DrinkRecipe) => ({
    id: drink.idDrink,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    category: drink.strCategory,
  }));
}

export async function handleFetchAllRecipes(pathname: string) {
  const isMeal = pathname.includes('meal');
  const url = formatUrl(isMeal);
  const response = await fetch(`${url}search.php?s=`);
  const data = await response.json();
  const recipes = formatRecipes(isMeal, data);

  return recipes;
}

export async function handleFetchRecipesByCategory(pathname: string, category: string) {
  const isMeal = pathname.includes('meal');
  const url = formatUrl(isMeal);
  const response = await fetch(`${url}filter.php?c=${category}`);
  const data = await response.json();
  const recipes = formatRecipes(isMeal, data);

  return recipes;
}

const formatUrlWithSearch = (url: string, searchType: SearchType | '', searchValue: string) => {
  switch (searchType) {
  case SearchType.INGREDIENT:
    return `${url}filter.php?i=${searchValue}`;
  case SearchType.NAME:
    return `${url}search.php?s=${searchValue}`;
  default:
    return `${url}search.php?f=${searchValue}`;
  }
};

export async function handleFetchFilteredRecipes(pathname: string, searchType: SearchType | '', searchValue: string) {
  const isMeal = pathname.includes('meal');
  let url = formatUrl(isMeal);
  url = formatUrlWithSearch(url, searchType, searchValue);
  const response = await fetch(url);
  const data = await response.json();
  if (data.meals === null || data.drinks === null) return null;
  const recipes = formatRecipes(isMeal, data);

  return recipes;
}

function formatJustARecipe(recipe: RecipeDetailsData, dataKey: string) {
  return {
    id: recipe[`id${dataKey}`],
    name: recipe[`str${dataKey}`],
    image: recipe[`str${dataKey}Thumb`],
    category: recipe.strCategory,
    instructions: recipe.strInstructions,
  };
}

function formatIngredientAndMeasure(recipe: RecipeDetailsData) {
  const listOfRecipeDetails = Object.entries(recipe);
  const ingredientListUnformated = listOfRecipeDetails.filter(([key, value]) => key.includes('strIngredient') && value);
  const measureListUnformated = listOfRecipeDetails.filter(([key, value]) => key.includes('strMeasure') && value);

  const ingredientAndMeasures = ingredientListUnformated.map(([key, value]) => {
    const index = key.split('strIngredient')[1];
    const measure = measureListUnformated.find(([key]) => key.split('strMeasure')[1] === index) || [`strMeasure${index}`, 'to taste'] as [string, string];
    return {
      ingredient: value,
      measure: measure[1],
    };
  });

  return ingredientAndMeasures;
}

export async function handleFetchRecipeDetails(pathname: string, id: string) {
  const isMeal = pathname.includes('meal');
  const url = formatUrl(isMeal);
  const response = await fetch(`${url}lookup.php?i=${id}`);
  const data = await response.json();
  const dataKeys = isMeal ? ({
    dataKey: 'meals',
    objectKey: 'Meal',
  }) : ({
    dataKey: 'drinks',
    objectKey: 'Drink',
  });
  const [recipe] = data[dataKeys.dataKey];
  
  const recipeWithoutIngredientList = formatJustARecipe(recipe, dataKeys.objectKey);
  const ingredientAndMeasures = formatIngredientAndMeasure(recipe);

  const recipeDetails = { ...recipeWithoutIngredientList, ingredientAndMeasures };
  return recipeDetails;
}

export async function handleFetchAllCategories(isMeal: boolean) {
  const url = formatUrl(isMeal);
  const response = await fetch(`${url}list.php?c=list`);
  const data = await response.json();
  const dataKey = isMeal ? 'meals' : 'drinks';
  const categories = data[dataKey].map((category: { strCategory: string }) => category.strCategory);
  
  return ['All', ...categories];
}

export async function handleFetchIngredients(isMeal: boolean) {
  const url = formatUrl(isMeal);
  const response = await fetch(`${url}list.php?i=list`);
  const data = await response.json();
  const dataKeys = isMeal ? ({
    dataKey: 'meals',
    objectKey: 'strIngredient',
  }) : ({
    dataKey: 'drinks',
    objectKey: 'strIngredient1',
  });
  const ingredients = data[dataKeys.dataKey].map((ingredient: { [key: string]: string }) => ingredient[dataKeys.objectKey]);

  return ingredients;
}

export async function handleFetchAreas() {
  const response = await fetch(`${URL_BASIS_MEAL}list.php?a=list`);
  const data = await response.json();
  const areas = data.meals.map((area: { strArea: string }) => area.strArea);
  return areas;
}
