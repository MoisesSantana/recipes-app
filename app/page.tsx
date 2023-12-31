'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { useProfileStore } from '@/store/profile';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import { InputText } from '@/components/input-text';
import { LoginInputs } from '@/types/forms';
import { Alex_Brush } from 'next/font/google';

const AlexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: '400'
});

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInFormSchemaType = z.infer<typeof signInFormSchema>;

export default function Home() {
  const router = useRouter();

  const methods = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
  });

  const { handleSubmit, formState } = methods;

  const setUserEmail = useProfileStore((state) => state.setUserEmail);

  const handleSignIn = (data: SignInFormSchemaType) => {
    setUserEmail(data.email);
    return router.push('/recipes/meals');
  };

  const isDisabled = !formState.isValid;
  return (
    <FormProvider {...methods}>
      <div className='bg-pink-50 min-h-screen h-full flex flex-col'>
        <h1 className={`${AlexBrush.className} text-4xl text-rose-600 fixed left-1/2 -translate-x-1/2 top-36 drop-shadow-md`}>Recipes App</h1>
        <section className='w-full flex flex-1 items-center justify-center'>
          <form onSubmit={handleSubmit(handleSignIn)} className='flex flex-col w-full max-w-xl px-4'>
            <InputText name={LoginInputs.EMAIL} text={LoginInputs.EMAIL} isALoginPage />
            <InputText name={LoginInputs.PASSWORD} text={LoginInputs.PASSWORD} isALoginPage />
            <Button
              type="submit"
              disabled={isDisabled}
            >
              Entrar
            </Button>
          </form>
        </section>
      </div>
    </FormProvider>
  );
}