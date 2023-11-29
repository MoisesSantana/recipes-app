import { useCurrentRecipe } from '@/store/current-recipe';
import { useFavsStore } from '@/store/favorites';
import { Heart, ShareNetwork } from '@phosphor-icons/react';
import { useParams, usePathname } from 'next/navigation';

type FavAndShareProps = {
  handleCopy: () => void;
}

export function FavAndShare({ handleCopy }: FavAndShareProps) {
  const pathname = usePathname();
  const params = useParams();

  const favsMeals = useFavsStore((state) => state.meals);
  const setFavsMeals = useFavsStore((state) => state.setMeals);
  const favsDrinks = useFavsStore((state) => state.drinks);
  const setFavsDrinks = useFavsStore((state) => state.setDrinks);
  const currentRecipe = useCurrentRecipe((state) => state.currentRecipe);

  const favs = pathname.includes('meals') ? favsMeals : favsDrinks;
  const setFavs = pathname.includes('meals') ? setFavsMeals : setFavsDrinks;

  const isFavorite = favs.some((fav) => fav.id === params.id);

  const handleFav = () => {
    if (isFavorite) setFavs(favs.filter((fav) => fav.id !== params.id));
    else setFavs([...favs, currentRecipe]);
  };

  return (
    <div className='flex'>
      <button onClick={ handleCopy }>
        <ShareNetwork data-testid="share-icon" size={32} fill='white' />
      </button>
      <button onClick={ handleFav }>
        <Heart data-testid="fav-icon" weight={ isFavorite ? 'fill' : 'regular' } size={32} fill='white' />
      </button>
    </div>
  );
}