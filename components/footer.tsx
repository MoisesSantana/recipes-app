'use client';

import { Compass, ForkKnife, Martini } from '@phosphor-icons/react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-rose-600 flex justify-between px-2 py-1 fixed top-full -translate-y-full w-full z-10">
      <Link href='/recipes/meals'>
        <ForkKnife size={32} fill='white' />
      </Link>
      <Link href='/recipes/explore'>
        <Compass size={32} fill='white' />
      </Link>
      <Link href='/recipes/drinks'>
        <Martini size={32} fill='white' />
      </Link>
    </footer>
  );
}