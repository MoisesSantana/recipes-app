import { Button } from '@/components/button';
import { Filters } from '../enums';

type FiltersButtonsProps = {
  setCategory: (category: Filters) => void;
}

export function FiltersButtons({ setCategory }: FiltersButtonsProps) {
  return (
    <section className='flex gap-4 pt-2'>
      <Button
        onClick={ () => setCategory(Filters.ALL) }
      >
        { Filters.ALL }
      </Button>
      <Button
        onClick={ () => setCategory(Filters.MEALS) }
      >
        { Filters.MEALS }
      </Button>
      <Button
        onClick={ () => setCategory(Filters.DRINKS) }
      >
        { Filters.DRINKS }
      </Button>
    </section>
  );
}