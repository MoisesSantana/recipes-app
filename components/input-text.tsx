import { InputsName, LoginInputs } from '@/types/forms';
import { UseFormRegister } from 'react-hook-form';

type InputTextProps = {
  name: InputsName;
  register: UseFormRegister<any>;
  text: string;
  value?: string;
  handleChange?: (value: string) => void;
  isALoginPage?: boolean
}

export function InputText({ name, register, text, value, handleChange, isALoginPage = false }: InputTextProps) {
  return (
    <>
      <label className='text-sm text-neutral-600 mb-1' htmlFor={ name }>{ text }</label>
      {isALoginPage ? (
        <input
          id={name}
          type="text"
          placeholder={ name === LoginInputs.EMAIL ? 'example@email.com' : '' }
          required
          {...register(name)}
          className="mb-4 px-2 py-1 border border-neutral-300 rounded-md"
        />
      ) : (
        <input
          id={name}
          type="text"
          required
          {...register(name)}
          value={value ?? ''}
          onChange={handleChange ? (e) => handleChange(e.target.value) : () => {}}
          className="mb-4 px-2 py-1 border border-neutral-300 rounded-md"
        />
      )}
    </>
  );
}