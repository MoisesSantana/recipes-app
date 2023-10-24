'use client';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { RecipeList } from '../components/recipe-list';
import { CategoryListModal } from '../components/category-list-modal';
import { useState } from 'react';
import { useSearchModalStore } from '@/zustand/search-modal';
import { SearchModal } from './search-modal';

const queryClient = new QueryClient();

export default function Main() {
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [category, setCategory] = useState('All');
  const openSearchModal = useSearchModalStore((state) => state.openSearchModal);

  function handleOpenCategoryModal() {
    setOpenCategoryModal((state) => !state);
  }

  function handleCategory(category: string) {
    setOpenCategoryModal((state) => !state);
    setCategory(category);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <button
        onClick={handleOpenCategoryModal}
        className="mx-2 mt-3 w-[calc(100%-16px)] py-2 rounded-md bg-white text-sm font-semibold text-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Categories
      </button>
      {openSearchModal && <SearchModal />}
      {openCategoryModal && (
        <CategoryListModal
          handleCategory={handleCategory}
          setOpenCategoryModal={handleOpenCategoryModal}
          selectedCategory={category}
        />
      )}
      <RecipeList category={category} />
    </QueryClientProvider>
  );
}