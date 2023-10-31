import Link from 'next/link';
import Image from 'next/image';
import { CurrentRecipe } from '@/zustand/types';

type RecipeProps = {
  recipe: CurrentRecipe;
  url: string;
}

export function RecipeCard({ recipe, url }: RecipeProps) {
  return (
    <Link href={url} className='rounded-md'>
      <Image
        src={recipe.image}
        alt={recipe.name}
        width={100}
        height={100}
        priority
        className='w-full rounded-md'
      />
      <h2 className='text-neutral-600'>{recipe.name}</h2>
    </Link>
  );
}