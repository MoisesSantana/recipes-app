import { useModalStore } from '@/zustand/modal';
import { useEffect, useRef } from 'react';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const searchFormSchema = z.object({
  search: z.string().min(1),
  searchType: z.string(),
});

type SearchFormSchemaType = z.infer<typeof searchFormSchema>;

export function SearchModal() {
  const { handleSubmit, register, formState, control } = useForm<SearchFormSchemaType>({
    resolver: zodResolver(searchFormSchema),
  });

  const isDisabled = !formState.isValid;

  const handleSubmitSearch = (data: SearchFormSchemaType) => {
    console.log(data);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const setOpenSearchModal = useModalStore((state) => state.setOpenSearchModal);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);


  return (
    <form onSubmit={handleSubmit(handleSubmitSearch)} className="bg-gray-50 flex-col px-4 py-3 flex sm:px-6 max-h-80 overflow-y-auto">
      <label
        className='text-sm text-neutral-600 mb-1'
        htmlFor="search-input"
      >
        Enter your search
      </label>
      <input
        className='mb-4 px-2 py-1 border border-neutral-300 rounded-md'
        type="text"
        id="search-input"
        {...register('search')}
      />
      <fieldset className='flex justify-between'>
        <Controller
          control={control}
          name='searchType'
          render={({ field }) => (
            <>
              <div className='flex items-center'>
                <input
                  type="radio"
                  className='mr-1'
                  id='ingredient'
                  value='ingredient'
                  onChange={(e) => field.onChange(e.target.value)}
                  checked={field.value === 'ingredient'}
                />
                <label
                  className='text-sm text-neutral-600'
                  htmlFor="ingredient"
                >
                  ingredient
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type="radio"
                  className='mr-1'
                  id='name'
                  value='name'
                  onChange={(e) => field.onChange(e.target.value)}
                  checked={field.value === 'name'}
                />
                <label
                  className='text-sm text-neutral-600'
                  htmlFor="name"
                >
                  name
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type="radio"
                  className='mr-1'
                  id='firs-letter'
                  value='first-letter'
                  onChange={(e) => field.onChange(e.target.value)}
                  checked={field.value === 'first-letter'}
                />
                <label
                  className='text-sm text-neutral-600'
                  htmlFor="firs-letter"
                >
                  first letter
                </label>
              </div>
            </>
          )}
        />
      </fieldset>
      <button disabled={isDisabled} className='disabled:opacity-50 disabled:cursor-not-allowed inline-flex justify-center rounded-md bg-rose-600 mt-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500'>
        Search
      </button>
    </form>
  );
}