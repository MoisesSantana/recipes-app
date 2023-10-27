'use client';

import { useModalStore } from '@/zustand/modal';
import { Heart, MagnifyingGlass, ShareNetwork, UserCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const haveSearch = (pathname.includes('/recipes/meals') || pathname.includes('/recipes/drinks')) && pathname.split('/').length === 3;
  const haveFavAndShare = (pathname.includes('/recipes/meals') || pathname.includes('/recipes/drinks')) && pathname.split('/').length === 4;

  const setOpenSearchModal = useModalStore((state) => state.setOpenSearchModal);

  return (
    <header className="bg-rose-600 flex justify-between px-2 py-1 fixed w-full z-10">
      <Link href='/profile'>
        <UserCircle size={32} fill='white' />
      </Link>
      <h1 className='text-white text-2xl'>Recipes App</h1>
      { haveSearch && (
        <button onClick={setOpenSearchModal}>
          <MagnifyingGlass size={32} fill='white' />
        </button> 
      )}
      {
        haveFavAndShare && (
          <div className='flex'>
            <button>
              <ShareNetwork size={32} fill='white' />
            </button>
            <button>
              <Heart size={32} fill='white' />
            </button>
          </div>
        )
      }
    </header>
  );
}