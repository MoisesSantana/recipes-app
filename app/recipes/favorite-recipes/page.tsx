'use client';

import { Button } from '@/components/button';
import { useFavsStore } from '@/zustand/favorites';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FavoriteRecipes() {
  const [category, setCategory] = useState('All');
  const [isClient, setIsClient] = useState(false);
  const favsMealsRecipes = useFavsStore((state) => state.meals);
  const favsDrinksRecipes = useFavsStore((state) => state.drinks);
  
  const favsRecipes = [...favsMealsRecipes, ...favsDrinksRecipes];

  useEffect(() => {
    setIsClient(true);
  }, []);

  function switchRecipeList() {
    switch (category) {
    case 'All':
      return favsRecipes;
    case 'Meals':
      return favsMealsRecipes;
    default:
      return favsDrinksRecipes;
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
            const isMeal = favsMealsRecipes.some(({ id }) => id === recipe.id);
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