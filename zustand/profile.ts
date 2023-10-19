import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ProfileState = {
  userEmail: string;
};

type ProfileAction = {
  setUserEmail: (email: ProfileState['userEmail']) => void;
}

export const useProfileStore = create<ProfileState & ProfileAction>()(
  persist(
    (set) => ({
      userEmail: '',
      setUserEmail: (email: string) => set(() => ({ userEmail: email })),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

