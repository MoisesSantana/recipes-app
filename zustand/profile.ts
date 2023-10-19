import { create } from 'zustand';

type ProfileState = {
  userEmail: string;
};

type ProfileAction = {
  setUserEmail: (email: ProfileState['userEmail']) => void;
}

export const useProfileStore = create<ProfileState & ProfileAction>((set) => ({
  userEmail: '',
  setUserEmail: (email: string) => set(() => ({ userEmail: email })),
}));
