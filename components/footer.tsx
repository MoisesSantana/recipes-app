'use client';

import { Compass, ForkKnife, Martini } from '@phosphor-icons/react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <nav className="bg-rose-600 flex justify-between px-2 py-1 fixed bottom-0 w-full z-10">
        <Link href='/recipes/meals'>
          <ForkKnife data-testid="fork-icon" size={32} fill='white' />
        </Link>
        <Link href='/recipes/explore'>
          <Compass data-testid="compass-icon" size={32} fill='white' />
        </Link>
        <Link href='/recipes/drinks'>
          <Martini data-testid="drink-icon" size={32} fill='white' />
        </Link>
      </nav>
    </footer>
  );
}