import { useModalStore } from '@/zustand/modal';
import { useEffect, useRef, useState } from 'react';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, SearchType } from '../types';

type SearchModalProps = {
  handleSearch: (search: Search) => void;
}

const searchFormSchema = z.object({
  search: z.string().min(1),
  searchType: z.string().refine((value) => Object.values(SearchType).includes(value as SearchType)),
});

type SearchFormSchemaType = z.infer<typeof searchFormSchema>;

export function SearchModal({ handleSearch }: SearchModalProps) {
  const [searchValue, setSearchValue] = useState('');
  const { handleSubmit, register, formState, control, watch } = useForm<SearchFormSchemaType>({
    resolver: zodResolver(searchFormSchema),
  });

  const search = watch('search');
  const searchType = watch('searchType');

  const isDisabled = !formState.isValid;

  const modalRef = useRef<HTMLDivElement>(null);
  const setOpenSearchModal = useModalStore((state) => state.setOpenSearchModal);
  
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (search?.length > 1 && searchType === 'first-letter') {
      setSearchValue(search.slice(0, 1));
    }
  }, [search, searchType]);

  const handleSearchInputChange = (value: string) => {
    if (search?.length > 1 && searchType === 'first-letter') {
      setSearchValue(value.slice(0, 1));
    } else {
      setSearchValue(value);
    }
  };
  
  const handleSubmitSearch = (data: SearchFormSchemaType) => {
    data.search = searchValue;
    handleSearch(data as Search);
    setOpenSearchModal();
  };

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
        value={searchValue}
        onChange={(e) => handleSearchInputChange(e.target.value)}
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
                  id={ SearchType.INGREDIENT }
                  value={ SearchType.INGREDIENT }
                  onChange={ (e) => field.onChange(e.target.value) }
                  checked={ field.value === SearchType.INGREDIENT }
                />
                <label
                  className='text-sm text-neutral-600'
                  htmlFor={ SearchType.INGREDIENT }
                >
                  { SearchType.INGREDIENT }
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type="radio"
                  className='mr-1'
                  id={ SearchType.NAME}
                  value={ SearchType.NAME}
                  onChange={ (e) => field.onChange(e.target.value) }
                  checked={ field.value === SearchType.NAME }
                />
                <label
                  className='text-sm text-neutral-600'
                  htmlFor={ SearchType.NAME }
                >
                  { SearchType.NAME }
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type="radio"
                  className='mr-1'
                  id={ SearchType.FIRST_LETTER }
                  value={ SearchType.FIRST_LETTER}
                  onChange={ (e) => field.onChange(e.target.value) }
                  checked={ field.value === SearchType.FIRST_LETTER }
                />
                <label
                  className='text-sm text-neutral-600'
                  htmlFor={ SearchType.FIRST_LETTER }
                >
                  { SearchType.FIRST_LETTER }
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