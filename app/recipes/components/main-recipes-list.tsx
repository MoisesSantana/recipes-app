'use client';

import { useModalStore } from '@/zustand/modal';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { OpenModalBtn } from './open-modal-btn';
import { SearchModal } from './search-modal';
import { ModalContainer } from './modal-container';
import { Titles } from '../enums';
import { ModalList } from './modal-list';
import { RecipeList } from './recipe-list';
import { Search } from '../types';
import { ModalTypes } from '@/zustand/enums';
import { MainContainer } from './main-container';

enum CurrentModal {
  LIST = 'list',
  SEARCH = 'search',
}

const queryClient = new QueryClient();

export function MainRecipesList() {
  const pathname = usePathname();
  const isExplorePage = pathname.includes('explore');

  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState<Search>({ search: '', searchType: '' });
  
  const openSearchModal = useModalStore((state) => state.openSearchModal);
  const openListModal = useModalStore((state) => state.openListModal);
  const setOpenListModal = useModalStore((state) => state.setOpenListModal);
  const setOpenSearchModal = useModalStore((state) => state.setOpenSearchModal);
  const selectedModal = useModalStore((state) => state.selectedModal);
  
  const isMeal = () => {
    const pathHasMeals = pathname.includes('meals');
    const selectedModalIsMeals = selectedModal === ModalTypes.MEALS_INGREDIENT;

    return pathHasMeals || selectedModalIsMeals && isExplorePage;
  };

  const handleCategory = (category: string) => {
    setCategory(category);
    setSearch({ search: '', searchType: '' });
  };

  const handleSearch = (search: Search) => {
    setSearch(search);
    setCategory('All');
  };

  let currentModal: CurrentModal | null = null;
  let currentSetModal: () => void = () => {};

  const handleOpenModal = () => {
    if (openListModal) {
      currentModal = CurrentModal.LIST;
      currentSetModal = setOpenListModal;
    }
    if (openSearchModal) {
      currentModal = CurrentModal.SEARCH;
      currentSetModal = setOpenSearchModal;
    }
  };

  handleOpenModal();

  const handleTitle = () => {
    if (currentModal === CurrentModal.SEARCH) return Titles.SEARCH;
    if (!isExplorePage) return Titles.CATEGORY;
    return Titles.INGREDIENTS;
  };

  const title = handleTitle();

  const openModal = openListModal || openSearchModal;

  return (
    <QueryClientProvider client={queryClient}>
      <MainContainer>
        <OpenModalBtn isExplorePage={isExplorePage} />
        {
          openModal && (
            <ModalContainer title={title} setOpenModal={currentSetModal}>
              {currentModal === CurrentModal.SEARCH && <SearchModal handleSearch={handleSearch} />}
              {currentModal === CurrentModal.LIST && <ModalList isMeal={isMeal()} handleCategory={handleCategory} setOpenModal={currentSetModal} />}
            </ModalContainer>
          )
        }
        { isExplorePage || <RecipeList search={search} category={category} />}
      </MainContainer>
    </QueryClientProvider>
  );
}