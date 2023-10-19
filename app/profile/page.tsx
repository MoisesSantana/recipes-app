'use client';

import { useProfileStore } from '@/zustand/profile';
import { useEffect, useState } from 'react';

export default function Profile() {
  const userEmail = useProfileStore((state) => state.userEmail);
  const [localUserEmail, setLocalUserEmail] = useState('');

  useEffect(() => {
    setLocalUserEmail(userEmail);
  }, [userEmail]);

  return (
    <div>{localUserEmail}</div>
  );
}