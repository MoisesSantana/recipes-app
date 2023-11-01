import { UserCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LinkCopied } from './link-copied';
import { SearchButton } from './search-button';
import { FavAndShare } from './fav-and-share';

export function Header() {
  const [copied, setCopied] = useState(false);

  const pathname = usePathname();

  const haveSearch = (pathname.includes('/recipes/meals') || pathname.includes('/recipes/drinks')) && pathname.split('/').length === 3;
  const haveFavAndShare = (pathname.includes('/recipes/meals') || pathname.includes('/recipes/drinks')) && pathname.split('/').length === 4;

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-rose-600 flex justify-between px-2 py-1 fixed w-full z-10">
      {copied && <LinkCopied />}
      <Link href='/profile'>
        <UserCircle size={32} fill='white' />
      </Link>
      <h1 className='text-white text-2xl'>Recipes App</h1>
      { haveSearch && <SearchButton />}
      { haveFavAndShare && <FavAndShare handleCopy={ handleCopy } />}
    </header>
  );
}