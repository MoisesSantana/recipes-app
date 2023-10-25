import { Error } from '@/components/error';
import { Loading } from '@/components/loading';
import { handleFetchAllCategories } from '@/services/fetch';
import { usePathname } from 'next/navigation';
import { useQuery } from 'react-query';
import { CategoryBtn } from './category-btn';

type CategoryListModalProps = {
  selectedCategory: string;
  handleCategory: (category: string) => void;
}

export function CategoryListModal({ handleCategory, selectedCategory }:CategoryListModalProps) {
  const pathname = usePathname();
  const dataKey = pathname.split('/')[2];

  const { isLoading, error, data } = useQuery(
    ['fetchAllCategories', pathname],
    () => handleFetchAllCategories(pathname)
  );

  if (error) return <Error />;

  let categories: string[] = [];

  if(!isLoading) {
    categories = data[dataKey].map(({ strCategory }: { strCategory: string }) => strCategory);
    categories = ['All', ...categories];
  }

  return (
    <div className="bg-gray-50 px-4 py-3 flex flex-wrap sm:justify-between justify-center sm:px-6 gap-4 max-h-80 overflow-y-auto">
      {isLoading ? <Loading hasModal /> : (
        <>
          {categories.map((category: string) => (
            <CategoryBtn
              key={category}
              selectedCategory={selectedCategory}
              handleCategory={handleCategory}
            >
              {category}
            </CategoryBtn>
          ))}
        </>
      )}
    </div>
  );
}