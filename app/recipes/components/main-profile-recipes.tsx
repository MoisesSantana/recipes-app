'use client';

import { useFinishedStore } from '@/zustand/finished';
import { useEffect, useState } from 'react';
import { Filters } from '../enums';
import { FiltersButtons } from './filter-buttons';
import { RecipeCard } from './recipe-card';
import { useFavsStore } from '@/zustand/favorites';
import { usePathname } from 'next/navigation';
import { MainContainer } from './main-container';

export function MainProfileRecipes() {
  const pathname = usePathname();
  const isFavorite = pathname.includes('favorite');

  const [category, setCategory] = useState<Filters>(Filters.ALL);
  const [isClient, setIsClient] = useState(false);
  const finishedMealsRecipes = useFinishedStore((state) => state.meals);
  const finishedDrinksRecipes = useFinishedStore((state) => state.drinks);
  const favsMealsRecipes = useFavsStore((state) => state.meals);
  const favsDrinksRecipes = useFavsStore((state) => state.drinks);
  
  const finishedRecipes = [...finishedMealsRecipes, ...finishedDrinksRecipes];
  const favsRecipes = [...favsMealsRecipes, ...favsDrinksRecipes];

  useEffect(() => {
    setIsClient(true);
  }, []);

  function handleCategory(category: Filters) {
    setCategory(category);
  }

  function switchRecipeList() {
    switch (category) {
    case Filters.ALL:
      return isFavorite ? favsRecipes : finishedRecipes;
    case Filters.MEALS:
      return isFavorite ? favsMealsRecipes : finishedMealsRecipes;
    default:
      return isFavorite ? favsDrinksRecipes : finishedDrinksRecipes;
    }
  }

  return (
    <MainContainer>
      <FiltersButtons setCategory={ handleCategory } />
      <section className='grid py-2 grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
        {isClient &&
          switchRecipeList().map((recipe) => {
            const isMeal = isFavorite ? (
              favsMealsRecipes.some(({ id }) => id === recipe.id)
            ) : (
              finishedMealsRecipes.some(({ id }) => id === recipe.id)
            );

            const url = isMeal ? `/recipes/meals/${recipe.id}` : `/recipes/drinks/${recipe.id}`;
            return <RecipeCard key={recipe.id} url={url} recipe={recipe} />;
          })}
      </section>
    </MainContainer>
  );
}