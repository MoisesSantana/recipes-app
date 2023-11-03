import { useModalStore } from '@/store/modal';
import { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, SearchType } from '@/types/search';
import { InputText } from '@/components/input-text';
import { SearchInputs } from '@/types/forms';
import { InputRadio } from '@/components/input-radio';

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
  const method = useForm<SearchFormSchemaType>({
    resolver: zodResolver(searchFormSchema),
  });

  const { handleSubmit, formState, control, watch } = method;

  const search = watch('search');
  const searchType = watch('searchType');

  const isDisabled = !formState.isValid;

  const setOpenSearchModal = useModalStore((state) => state.setOpenSearchModal);

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
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(handleSubmitSearch)} className="bg-gray-50 flex-col px-4 py-3 flex sm:px-6 max-h-80 overflow-y-auto">
        <InputText
          name={ SearchInputs.SEARCH }
          text='Enter your search'
          value={searchValue}
          handleChange={handleSearchInputChange}
        />
        <fieldset className='flex justify-between'>
          <Controller
            control={control}
            name='searchType'
            render={({ field }) => (
              <>
                <InputRadio field={field} value={ SearchType.INGREDIENT } />
                <InputRadio field={field} value={ SearchType.NAME } />
                <InputRadio field={field} value={ SearchType.FIRST_LETTER } />
              </>
            )}
          />
        </fieldset>
        <button disabled={isDisabled} className='disabled:opacity-50 disabled:cursor-not-allowed inline-flex justify-center rounded-md bg-rose-600 mt-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500'>
          Search
        </button>
      </form>
    </FormProvider>
  );
}