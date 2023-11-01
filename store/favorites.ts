import { CurrentRecipe } from '@/types/recipe-types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type FavsState = {
  meals: CurrentRecipe[];
  drinks: CurrentRecipe[];
};

type FavsAction = {
  setMeals: (meals: CurrentRecipe[]) => void;
  setDrinks: (drinks: CurrentRecipe[]) => void;
}

export const useFavsStore = create<FavsState & FavsAction>()(
  persist(
    (set) => ({
      meals: [],
      drinks: [],
      setMeals: (meals: CurrentRecipe[]) => set(() => ({ meals })),
      setDrinks: (drinks: CurrentRecipe[]) => set(() => ({ drinks })),
    }),
    {
      name: 'favs-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
