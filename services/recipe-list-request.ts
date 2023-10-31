import { ModalTypes } from '@/zustand/enums';
import { handleFetchAllRecipes, handleFetchFilteredRecipes, handleFetchRecipeByIngredient, handleFetchRecipesByArea, handleFetchRecipesByCategory } from './fetch';
import { SearchType } from '@/app/recipes/types';

function exploreRequests(selectedModal: ModalTypes | '', category: string) {
  if (selectedModal === ModalTypes.MEALS_INGREDIENT) return handleFetchRecipeByIngredient(true, category);
  if (selectedModal === ModalTypes.DRINKS_INGREDIENT) return handleFetchRecipeByIngredient(false, category);
  if (selectedModal === ModalTypes.AREA) return handleFetchRecipesByArea(category);
  return null;
}

export function switchRequest(
  pathname: string,
  selectedModal: ModalTypes | '',
  category: string,
  searchType: SearchType | '',
  searchValue: string,
) {
  const isExplore = pathname.includes('explore');

  console.log({ isExplore, selectedModal});

  if (isExplore) return exploreRequests(selectedModal, category);
  if (selectedModal === ModalTypes.CATEGORY && category !== 'All') return handleFetchRecipesByCategory(pathname, category);
  if (selectedModal === ModalTypes.SEARCH) return handleFetchFilteredRecipes(pathname, searchType, searchValue);
  return handleFetchAllRecipes(pathname);
}