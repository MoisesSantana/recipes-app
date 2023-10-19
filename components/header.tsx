'use client';

import { MagnifyingGlass, UserCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const noResearch = pathname.includes('/explore');

  return (
    <header className="bg-rose-600 flex justify-between px-2 py-1 fixed w-full">
      <Link href='/profile'>
        <UserCircle size={32} fill='white' />
      </Link>
      <h1 className='text-white text-2xl'>Recipes App</h1>
      { noResearch || (
        <button>
          <MagnifyingGlass size={32} fill='white' />
        </button> 
      )}
    </header>
  );
}