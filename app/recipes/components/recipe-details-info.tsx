import { RecipeDetails } from '@/types/recipe-types';

type RecipeDetailsInfoProps = {
  data: RecipeDetails
};

export function RecipeDetailsInfo({ data }: RecipeDetailsInfoProps) {
  return (
    <div className='px-2 md:h-72 lg:h-80 flex flex-col md:gap-3 gap-8 justify-between'>
      <div className='border-b-2'>
        <h2 className='text-neutral-600 text-lg font-bold'>{data.name}</h2>
        <h3 className='text-neutral-600'>Category: {data.category}</h3>
      </div>
      
      <div>
        <h3 className='text-neutral-600 text-lg font-bold'>Ingredients</h3>
        <ul className='overflow-y-auto md:h-20'>
          {
            data.ingredientAndMeasures.map(({ ingredient, measure }: { ingredient: string, measure: string }) => (
              <li className='text-neutral-600' key={`${ingredient}-${measure}`}>{ingredient} - {measure}</li>
            ))
          }
        </ul>
      </div>

      <div>
        <h3 className='text-neutral-600 text-lg font-bold'>Instructions</h3>
        <div className='overflow-y-auto md:h-20'>
          <p className='text-neutral-600'>{data.instructions}</p>
        </div>
      </div>
    </div>
  );
}