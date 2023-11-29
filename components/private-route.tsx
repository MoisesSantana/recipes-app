'is client';

import { useProfileStore } from '@/store/profile';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loading } from './loading';
import { APP_ROUTES } from '@/types/paths';

type PrivateRouterProps = {
  children: React.ReactNode;
}

export function PrivateRouter({ children }: PrivateRouterProps) {
  const [isClient, setIsClient] = useState(false);
  console.log(useRouter())
  const { push } = useRouter();
  const userEmail = useProfileStore((state) => state.userEmail);

  useEffect(() => {
    setIsClient(true);
    if (!userEmail) push(APP_ROUTES.public.login);
  }, []);

  if (!isClient) return <Loading />;

  return (
    <>
      { userEmail && children }
    </>
  );
}