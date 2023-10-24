'use client';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { RecipeList } from '../components/recipe-list';
import { CategoryListModal } from '../components/category-list-modal';
import { useState } from 'react';

const queryClient = new QueryClient();

export default function Main() {
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState('All');

  function handleOpenModal() {
    setOpenModal((state) => !state);
  }

  function handleCategory(category: string) {
    setOpenModal((state) => !state);
    setCategory(category);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <button
        onClick={handleOpenModal}
        className="mx-2 mt-3 w-[calc(100%-16px)] py-2 rounded-md bg-white text-sm font-semibold text-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Categories
      </button>
      {openModal && (
        <CategoryListModal
          handleCategory={handleCategory}
          setOpenModal={handleOpenModal}
          selectedCategory={category}
        />
      )}
      <RecipeList category={category} />
    </QueryClientProvider>
  );
}