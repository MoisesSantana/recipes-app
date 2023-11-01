'use client';

import { useModalStore } from '@/store/modal';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { OpenModalBtn } from './open-modal-btn';
import { SearchModal } from './search-modal';
import { ModalContainer } from './modal-container';
import { ModalList } from './modal-list';
import { RecipeList } from './recipe-list';
import { MainContainer } from './main-container';
import { Search } from '@/types/search';

const queryClient = new QueryClient();

export function MainRecipesList() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState<Search>({ search: '', searchType: '' });
  
  const openSearchModal = useModalStore((state) => state.openSearchModal);
  const openListModal = useModalStore((state) => state.openListModal);

  const handleCategory = (category: string) => {
    setCategory(category);
    setSearch({ search: '', searchType: '' });
  };

  const handleSearch = (search: Search) => {
    setSearch(search);
    setCategory('All');
  };

  const openModal = openListModal || openSearchModal;

  return (
    <QueryClientProvider client={queryClient}>
      <MainContainer>
        <OpenModalBtn />
        { openModal && (
          <ModalContainer>
            { openListModal ? (
              <ModalList handleCategory={handleCategory} />
            ) : (
              <SearchModal handleSearch={handleSearch} />
            )}
          </ModalContainer>
        )}
        <RecipeList search={search} category={category} />
      </MainContainer>
    </QueryClientProvider>
  );
}