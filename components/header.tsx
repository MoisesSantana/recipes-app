'use client';

import { useCurrentRecipe } from '@/zustand/current-recipe';
import { ModalTypes } from '@/zustand/enums';
import { useFavsStore } from '@/zustand/favorites';
import { useModalStore } from '@/zustand/modal';
import { Heart, MagnifyingGlass, ShareNetwork, UserCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const [copied, setCopied] = useState(false);
  const [localFav, setLocalFav] = useState(false);

  const params = useParams();
  const pathname = usePathname();
  const dataKey = pathname.split('/')[2];

  const haveSearch = (pathname.includes('/recipes/meals') || pathname.includes('/recipes/drinks')) && pathname.split('/').length === 3;
  const haveFavAndShare = (pathname.includes('/recipes/meals') || pathname.includes('/recipes/drinks')) && pathname.split('/').length === 4;

  const setOpenSearchModal = useModalStore((state) => state.setOpenSearchModal);
  const setSelectedModal = useModalStore((state) => state.setSelectedModal);
  const favsMeals = useFavsStore((state) => state.meals);
  const setFavsMeals = useFavsStore((state) => state.setMeals);
  const favsDrinks = useFavsStore((state) => state.drinks);
  const setFavsDrinks = useFavsStore((state) => state.setDrinks);
  const currentRecipe = useCurrentRecipe((state) => state.currentRecipe);

  const favs = dataKey === 'meals' ? favsMeals : favsDrinks;
  const setFavs = dataKey === 'meals' ? setFavsMeals : setFavsDrinks;


  const isFavorite = favs.some((fav) => fav.id === params.id);

  const handleFav = () => {
    if (isFavorite) setFavs(favs.filter((fav) => fav.id !== params.id));
    else setFavs([...favs, currentRecipe]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setLocalFav(isFavorite);
  }, [favsMeals, favsDrinks, pathname]);

  return (
    <header className="bg-rose-600 flex justify-between px-2 py-1 fixed w-full z-10">
      <>
        {copied && (
          <div className='absolute bg-white border border-rose-600 rounded-md text-rose-600 text-center w-32'>
            <p className='p-2'>Link Copied!</p>
          </div>
        )}
      </>
      <Link href='/profile'>
        <UserCircle size={32} fill='white' />
      </Link>
      <h1 className='text-white text-2xl'>Recipes App</h1>
      { haveSearch && (
        <button
          onClick={ () => {
            setSelectedModal(ModalTypes.SEARCH);
            setOpenSearchModal();
          }}
        >
          <MagnifyingGlass size={32} fill='white' />
        </button> 
      )}
      {
        haveFavAndShare && (
          <div className='flex'>
            <button onClick={ handleCopy }>
              <ShareNetwork size={32} fill='white' />
            </button>
            <button onClick={ handleFav }>
              <Heart weight={ localFav ? 'fill' : 'regular' } size={32} fill='white' />
            </button>
          </div>
        )
      }
    </header>
  );
}