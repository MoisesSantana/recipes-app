import { SearchType } from '@/types/search';
import { ControllerRenderProps } from 'react-hook-form';

type InputRadioProps = {
  field: ControllerRenderProps<{ search: string, searchType: string }, 'searchType'>;
  value: SearchType;
}

export function InputRadio({ field, value }: InputRadioProps) {
  return (
    <div className='flex items-center'>
      <input
        type="radio"
        className='mr-1'
        id={ value }
        value={ value }
        onChange={ (e) => field.onChange(e.target.value) }
        checked={ field.value === value }
      />
      <label
        className='text-sm text-neutral-600'
        htmlFor={ value }
      >
        { value }
      </label>
    </div>
  );
}