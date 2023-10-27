() =>
  fetch('search.php?s=').then(res =>
    res.json()
  );

const URL_BASIS_MEAL = 'https://www.themealdb.com/api/json/v1/1/';
const URL_BASIS_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';

export function handleFetchAllRecipes(pathname: string) {
  const isMeal = pathname.includes('meal');

  if (isMeal) return fetch(`${URL_BASIS_MEAL}search.php?s=`).then(res => res.json());
  return fetch(`${URL_BASIS_DRINK}search.php?s=`).then(res => res.json());
}

export function handleFetchAllCategories(pathname: string) {
  const isMeal = pathname.includes('meal');

  if (isMeal) return fetch(`${URL_BASIS_MEAL}list.php?c=list`).then(res => res.json());
  return fetch(`${URL_BASIS_DRINK}list.php?c=list`).then(res => res.json());
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
