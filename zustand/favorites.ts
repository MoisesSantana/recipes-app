import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type FavsState = {
  meals: string[];
  drinks: string[];
};

type FavsAction = {
  setMeals: (meals: string[]) => void;
  setDrinks: (drinks: string[]) => void;
}

export const useFavsStore = create<FavsState & FavsAction>()(
  persist(
    (set) => ({
      meals: [],
      drinks: [],
      setMeals: (meals: string[]) => set(() => ({ meals })),
      setDrinks: (drinks: string[]) => set(() => ({ drinks })),
    }),
    {
      name: 'favs-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

