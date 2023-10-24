import { useSearchModalStore } from '@/zustand/search-modal';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
// import { usePathname } from 'next/navigation';
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
  // const pathname = usePathname();
  // const dataKey = pathname.split('/')[2];
  const { handleSubmit, register, formState, control } = useForm<SearchFormSchemaType>({
    resolver: zodResolver(searchFormSchema),
  });

  const isDisabled = !formState.isValid;

  const handleSubmitSearch = (data: SearchFormSchemaType) => {
    console.log(data);
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const setOpenSearchModal = useSearchModalStore((state) => state.setOpenSearchModal);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);


  return (
    <div
      ref={modalRef}
      className="relative z-20"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      tabIndex={0}
      onKeyDown={({ key }) => key === 'Escape' && setOpenSearchModal()}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <button
              type="button"
              className="absolute right-2 top-2"
              aria-label="Close"
              onClick={setOpenSearchModal}
            >
              <X fill='red' size={24} weight='bold' />
            </button>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-center">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 sm:mx-0 sm:h-10 sm:w-10">
                  <MagnifyingGlass size={32} />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Search</h3>
                </div>
              </div>
            </div>
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
                          firs letter
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
          </div>
        </div>
      </div>
    </div>
  );
}