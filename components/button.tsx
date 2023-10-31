import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return (
    <button
      className="md:flex-1 w-full mt-4 bg-white text-sm font-semibold text-neutral-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-md py-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      {props.children}
    </button>
  );
}