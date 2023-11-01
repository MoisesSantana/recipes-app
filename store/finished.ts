import { CurrentRecipe } from '@/types/recipe-types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type FinishedRecipesState = {
  meals: CurrentRecipe[];
  drinks: CurrentRecipe[];
};

type FinishedRecipesAction = {
  setMeals: (meals: CurrentRecipe[]) => void;
  setDrinks: (drinks: CurrentRecipe[]) => void;
}

export const useFinishedStore = create<FinishedRecipesState & FinishedRecipesAction>()(
  persist(
    (set) => ({
      meals: [],
      drinks: [],
      setMeals: (meals: CurrentRecipe[]) => set(() => ({ meals })),
      setDrinks: (drinks: CurrentRecipe[]) => set(() => ({ drinks })),
    }),
    {
      name: 'finished-recipes-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);