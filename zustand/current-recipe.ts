import { create } from 'zustand';
import { CurrentRecipe } from './types';

type CurrentRecipeState = {
  currentRecipe: CurrentRecipe;
};

type CurrentRecipeAction = {
  setCurrentRecipe: (currentRecipe: CurrentRecipe) => void;
};

export const useCurrentRecipe = create<CurrentRecipeState & CurrentRecipeAction>((set) => ({
  currentRecipe: { id: '', thumb: '', name: '' },
  setCurrentRecipe: (currentRecipe: CurrentRecipe) => set(() => ({ currentRecipe })),
}));

