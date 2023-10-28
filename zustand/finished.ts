import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


type FinishedRecipesState = {
  meals: string[];
  drinks: string[];
};

type FinishedRecipesAction = {
  setMeals: (meals: string[]) => void;
  setDrinks: (drinks: string[]) => void;
}

export const useFinishedStore = create<FinishedRecipesState & FinishedRecipesAction>()(
  persist(
    (set) => ({
      meals: [],
      setMeals: (meals: string[]) => set(() => ({ meals })),
      drinks: [],
      setDrinks: (drinks: string[]) => set(() => ({ drinks })),
    }),
    {
      name: 'finished-recipes-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

