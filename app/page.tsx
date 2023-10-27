'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useProfileStore } from '@/zustand/profile';
import { useRouter } from 'next/navigation';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignInFormSchemaType = z.infer<typeof signInFormSchema>;

export default function Home() {
  const router = useRouter();

  const { handleSubmit, register, formState,  } = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
  });

  const setUserEmail = useProfileStore((state) => state.setUserEmail);

  const handleSignIn = (data: SignInFormSchemaType) => {
    setUserEmail(data.email);
    return router.push('/recipes/meals');
  };

  const isDisabled = !formState.isValid;
  return (
    <div className='bg-pink-50 min-h-screen h-full flex flex-col'>
      <h1 className='text-2xl font-black text-rose-600 fixed left-1/2 -translate-x-1/2 top-20 drop-shadow-md'>Recipes App</h1>
      <section className='w-full flex flex-1 items-center justify-center'>
        <form onSubmit={handleSubmit(handleSignIn)} className='flex flex-col w-full max-w-xl px-4'>
          <label className='text-sm text-neutral-600 mb-1' htmlFor='email'>email</label>
          <input
            id='email'
            type="text"
            placeholder="example@email.com"
            required
            {...register('email')}
            className='mb-4 px-2 py-1 border border-neutral-300 rounded-md'
          />
          <label className='text-sm text-neutral-600 mb-1' htmlFor='pass'>password</label>
          <input
            id='pass'
            type="password"
            required
            {...register('password')}
            className='mb-8 px-2 py-1 border border-neutral-300 rounded-md'
          />
          <button
            className='w-full bg-rose-600 border-neutral-300 rounded-md px py-1 text-white disabled:opacity-50 disabled:cursor-not-allowed'
            type="submit"
            disabled={isDisabled}
          >
            Entrar
          </button>
        </form>
      </section>
    </div>
  );
}