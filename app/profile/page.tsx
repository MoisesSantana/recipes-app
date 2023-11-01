'use client';

import { Button } from '@/components/button';
import { useFavsStore } from '@/store/favorites';
import { useFinishedStore } from '@/store/finished';
import { useProfileStore } from '@/store/profile';
import { User } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MainContainer } from '../recipes/components/main-container';

export default function Profile() {
  const userEmail = useProfileStore((state) => state.userEmail);
  const setUserEmail = useProfileStore((state) => state.setUserEmail);
  const setMealsFavs = useFavsStore((state) => state.setMeals);
  const setDrinksFavs = useFavsStore((state) => state.setDrinks);
  const setFinishedMeals = useFinishedStore((state) => state.setMeals);
  const setFinishedDrinks = useFinishedStore((state) => state.setDrinks);
  const [localUserEmail, setLocalUserEmail] = useState('');
  const router = useRouter();

  if (!userEmail) router.push('/');

  useEffect(() => {
    setLocalUserEmail(userEmail);
  }, [userEmail]);

  const handleLogout = () => {
    setUserEmail('');
    setMealsFavs([]);
    setDrinksFavs([]);
    setFinishedMeals([]);
    setFinishedDrinks([]);
    router.push('/');
  };

  return (
    <MainContainer>
      <section className='flex flex-col items-center py-10'>
        <User size={42} fill='#e11d48' />
        <h1 className='text-rose-600 font-bold'>{localUserEmail}</h1>
      </section>

      <section className='flex flex-col gap-4 lg:flex-row'>
        <Button
          onClick={() => router.push('/recipes/completed-recipes')}
        >
          Completed Recipes
        </Button>
        <Button
          onClick={() => router.push('/recipes/favorite-recipes')}
        >
          Favorite Recipes
        </Button>
        <Button
          onClick={handleLogout}
        >
          Logout
        </Button>
      </section>
    </MainContainer>
  );
}