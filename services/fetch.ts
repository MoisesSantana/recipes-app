const URL_BASIS_MEAL = 'https://www.themealdb.com/api/json/v1/1/';
const URL_BASIS_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

export function handleFetchAllRecipes(pathname: string) {
  const isMeal = pathname.includes('meal');

  if (isMeal) return fetch(`${URL_BASIS_MEAL}search.php?s=`).then(res => res.json());
  return fetch(`${URL_BASIS_DRINK}search.php?s=`).then(res => res.json());
}

export async function handleFetchAllCategories(isDrink: boolean) {
  if (isDrink) {
    const response = await fetch(`${URL_BASIS_DRINK}list.php?c=list`);
    const data = await response.json();
    const categories = data.drinks.map((category: { strCategory: string }) => category.strCategory);
    return ['All', ...categories];
  }

  const response = await fetch(`${URL_BASIS_MEAL}list.php?c=list`);
  const data = await response.json();
  const categories = data.meals.map((category: { strCategory: string }) => category.strCategory);
  return ['All', ...categories];
}

export function handleFetchRecipesByCategory(pathname: string, category: string) {
  const isMeal = pathname.includes('meal');

  if (isMeal) return fetch(`${URL_BASIS_MEAL}filter.php?c=${category}`).then(res => res.json());
  return fetch(`${URL_BASIS_DRINK}filter.php?c=${category}`).then(res => res.json());
}

export function handleFetchFilteredRecipes(pathname: string, searchType: string, searchValue: string) {
  const isMeal = pathname.includes('meal');

  if (isMeal) {
    switch (searchType) {
    case 'ingredient':
      return fetch(`${URL_BASIS_MEAL}filter.php?i=${searchValue}`).then(res => res.json());
    case 'name':
      return fetch(`${URL_BASIS_MEAL}search.php?s=${searchValue}`).then(res => res.json());
    default:
      return fetch(`${URL_BASIS_MEAL}search.php?f=${searchValue}`).then(res => res.json());
    }
  }
  
  switch (searchType) {
  case 'ingredient':
    return fetch(`${URL_BASIS_DRINK}filter.php?i=${searchValue}`).then(res => res.json());
  case 'name':
    return fetch(`${URL_BASIS_DRINK}search.php?s=${searchValue}`).then(res => res.json());
  default:
    return fetch(`${URL_BASIS_DRINK}search.php?f=${searchValue}`).then(res => res.json());
  }
}

export function handleFetchRecipeDetails(pathname: string, id: string) {
  const isMeal = pathname.includes('meal');

  if (isMeal) return fetch(`${URL_BASIS_MEAL}lookup.php?i=${id}`).then(res => res.json());
  return fetch(`${URL_BASIS_DRINK}lookup.php?i=${id}`).then(res => res.json());
}

export async function handleFetchIngredients(isDrink: boolean) {
  if (isDrink) {
    const response = await fetch(`${URL_BASIS_DRINK}list.php?i=list`);
    const data = await response.json();
    const ingredients = data.drinks.map((ingredient: { strIngredient1: string }) => ingredient.strIngredient1);
    return ingredients;
  }

  const response = await fetch(`${URL_BASIS_MEAL}list.php?i=list`);
  const data = await response.json();
  const ingredients = data.meals.map((ingredient: { strIngredient: string }) => ingredient.strIngredient);
  return ingredients;
}

export async function handleFetchAreas() {
  const response = await fetch(`${URL_BASIS_MEAL}list.php?a=list`);
  const data = await response.json();
  const areas = data.meals.map((area: { strArea: string }) => area.strArea);
  return areas;
}
