import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Recipe } from '@/services/fetch';

type RecipeProps = {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeProps) {
  const pathname = usePathname();
  const url = `${pathname}/${recipe.id}`;

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