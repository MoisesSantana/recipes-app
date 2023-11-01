import { Button } from '@/components/button';
import { ProfileFilters } from '@/types/filters';

type FiltersButtonsProps = {
  setCategory: (category: ProfileFilters) => void;
}

export function FiltersButtons({ setCategory }: FiltersButtonsProps) {
  return (
    <section className='flex gap-4 pt-2'>
      <Button
        onClick={ () => setCategory(ProfileFilters.ALL) }
      >
        { ProfileFilters.ALL }
      </Button>
      <Button
        onClick={ () => setCategory(ProfileFilters.MEALS) }
      >
        { ProfileFilters.MEALS }
      </Button>
      <Button
        onClick={ () => setCategory(ProfileFilters.DRINKS) }
      >
        { ProfileFilters.DRINKS }
      </Button>
    </section>
  );
}