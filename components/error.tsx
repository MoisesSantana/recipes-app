import { Warning } from '@phosphor-icons/react';

type ErrorProps = {
  message: string;
}

export function Error({ message }: ErrorProps) {
  return (
    <div className='h-[calc(100vh-80px)] flex items-center justify-center'>
      <button disabled className="bg-rose-600 flex px-8 py-4 rounded-md text-white items-center">
        {message}
        <Warning data-testid="warning-icon" className='animate-pulse ml-4' size={32} />
      </button>
    </div>
  );
}