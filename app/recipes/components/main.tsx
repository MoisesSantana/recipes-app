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

const queryClient = new QueryClient();

export default function Main() {
  const [category, setCategory] = useState('All');
  const openSearchModal = useModalStore((state) => state.openSearchModal);
  const openCategoryModal = useModalStore((state) => state.openCategoryModal);
  const setOpenCategoryModal = useModalStore((state) => state.setOpenCategoryModal);
  const setOpenSearchModal = useModalStore((state) => state.setOpenSearchModal);

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
            {currentModal === 'search' && <SearchModal />}
            {currentModal === 'category' && (
              <CategoryListModal
                handleCategory={setCategory}
                selectedCategory={category}
              />
            )}
          </ModalContainer>
        )
      }
      <RecipeList category={category} />
    </QueryClientProvider>
  );
}