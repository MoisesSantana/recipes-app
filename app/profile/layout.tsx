import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Recipes App',
  description: 'Your Favorite Recipes App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className='pt-[40px] bg-pink-50'>
        {children}
      </div>
      <Footer />
    </>
  );
}
