'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PrivateRouter } from '@/components/private-route';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PrivateRouter>
      <Header />
      <div className='pt-[40px] bg-pink-50'>
        {children}
      </div>
      <Footer />
    </PrivateRouter>
  );
}
