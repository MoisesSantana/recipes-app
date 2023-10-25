import { useModalStore } from '@/zustand/modal';

type CategoryBtnProps = {
  children: string;
  selectedCategory: string;
  handleCategory: (category: string) => void;
}

export function CategoryBtn({ children, selectedCategory, handleCategory }: CategoryBtnProps) {
  const setCategoryModal = useModalStore((state) => state.setOpenCategoryModal);
  
  let btnClassName = 'inline-flex justify-center rounded-md bg-rose-600 w-40 sm:w-52 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500';
  const regex = new RegExp('\\bbg-rose-600\\b', 'g');
  
  if (children === selectedCategory) btnClassName = btnClassName.replace(regex, 'bg-rose-500');

  return (
    <button
      onClick={ () => {
        setCategoryModal();
        handleCategory(children);
      } }
      className={ btnClassName }
    >
      {children}
    </button>
  );
}