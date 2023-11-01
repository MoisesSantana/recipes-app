import { CurrentRecipe } from '@/types/recipe-types';
import { create } from 'zustand';

type CurrentRecipeState = {
  currentRecipe: CurrentRecipe;
};

type CurrentRecipeAction = {
  setCurrentRecipe: (currentRecipe: CurrentRecipe) => void;
};

export const useCurrentRecipe = create<CurrentRecipeState & CurrentRecipeAction>((set) => ({
  currentRecipe: { id: '', image: '', name: '' },
  setCurrentRecipe: (currentRecipe: CurrentRecipe) => set(() => ({ currentRecipe })),
}));
