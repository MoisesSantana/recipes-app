'use client';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { RecipeList } from '../components/recipe-list';
import { CategoryListModal } from '../components/category-list-modal';
import { useState } from 'react';
import { useModalStore } from '@/zustand/modal';
import { SearchModal } from './search-modal';
import { ModalContainer } from './modal-container';

type Search = {
  search: string;
  searchType: string;
}

const queryClient = new QueryClient();

export default function Main() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState({ search: '', searchType: '' });
  const openSearchModal = useModalStore((state) => state.openSearchModal);
  const openCategoryModal = useModalStore((state) => state.openCategoryModal);
  const setOpenCategoryModal = useModalStore((state) => state.setOpenCategoryModal);
  const setOpenSearchModal = useModalStore((state) => state.setOpenSearchModal);

  const handleCategory = (category: string) => {
    setCategory(category);
    setSearch({ search: '', searchType: '' });
  };

  const handleSearch = (search: Search) => {
    setSearch(search);
    setCategory('All');
  };

  let currentModal: 'category' | 'search' | null = null;
  let currentSetModal: () => void = () => null;

  const handleOpenModal = () => {
    if (openCategoryModal) {
      currentModal = 'category';
      currentSetModal = setOpenCategoryModal;
    }
    if (openSearchModal) {
      currentModal = 'search';
      currentSetModal = setOpenSearchModal;
    }
  };

  handleOpenModal();
  const openModal = openCategoryModal || openSearchModal;

  return (
    <QueryClientProvider client={queryClient}>
      <button
        onClick={setOpenCategoryModal}
        className="mx-2 mt-3 w-[calc(100%-16px)] py-2 rounded-md bg-white text-sm font-semibold text-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Categories
      </button>
      {
        openModal && (
          <ModalContainer title={currentModal} setOpenModal={currentSetModal}>
            {currentModal === 'search' && <SearchModal handleSearch={handleSearch} />}
            {currentModal === 'category' && (
              <CategoryListModal
                handleCategory={handleCategory}
                selectedCategory={category}
              />
            )}
          </ModalContainer>
        )
      }
      <RecipeList search={search} category={category} />
    </QueryClientProvider>
  );
}