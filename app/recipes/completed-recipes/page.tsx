'use client';

import { Button } from '@/components/button';
import { useFinishedStore } from '@/zustand/finished';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CompletedRecipes() {
  const [category, setCategory] = useState('All');
  const [isClient, setIsClient] = useState(false);
  const finishedMealsRecipes = useFinishedStore((state) => state.meals);
  const finishedDrinksRecipes = useFinishedStore((state) => state.drinks);
  
  const finishedRecipes = [...finishedMealsRecipes, ...finishedDrinksRecipes];


  useEffect(() => {
    setIsClient(true);
  }, []);

  function switchRecipeList() {
    switch (category) {
    case 'All':
      return finishedRecipes;
    case 'Meals':
      return finishedMealsRecipes;
    default:
      return finishedDrinksRecipes;
    }
  }

  return (
    <main className='h-[calc(100vh-80px)]'>
      <section className='flex gap-4 pt-2 mx-2'>
        <Button
          onClick={ () => setCategory('All') }>
          All
        </Button>
        <Button
          onClick={ () => setCategory('Meals') }>
          Meals
        </Button>
        <Button
          onClick={ () => setCategory('Drinks') }>
          Drinks
        </Button>
      </section>
      <section className='grid p-2 grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
        {isClient &&
          switchRecipeList().map((recipe) => {
            const isMeal = finishedMealsRecipes.some(({ id }) => id === recipe.id);
            const url = isMeal ? `/recipes/meals/${recipe.id}` : `/recipes/drinks/${recipe.id}`;
            return (
              <Link href={url} key={`${recipe.name}-${recipe.id}`}>
                <Image
                  src={recipe.thumb}
                  alt={recipe.name}
                  width={100}
                  height={100}
                  priority
                  className='w-full rounded-md'
                />
                <h2 className='text-neutral-600'>{recipe.name}</h2>
              </Link>
            );
          })}
      </section>
    </main>
  );
}