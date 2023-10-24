import Link from 'next/link';
import { Recipe } from '../types';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

type RecipeProps = {
  recipe: Recipe;
  mealOrDrink: string;
}

export function RecipeCard({ recipe, mealOrDrink }: RecipeProps) {
  const pathname = usePathname();
  const url = `${pathname}/${recipe[`id${mealOrDrink}` as keyof Recipe]}`;

  return (
    <Link href={url} className='rounded-md'>
      <Image
        src={recipe[`str${mealOrDrink}Thumb` as keyof Recipe]}
        alt={recipe[`str${mealOrDrink}` as keyof Recipe]}
        width={100}
        height={100}
        priority
        className='w-full rounded-md'
      />
      <h2 className='text-neutral-600'>{recipe[`str${mealOrDrink}` as keyof Recipe]}</h2>
    </Link>
  );
}