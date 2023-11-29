import { SpinnerGap } from '@phosphor-icons/react';

export function Loading() {
  return (
    <div className='h-[calc(100vh-80px)] flex items-center justify-center'>
      <button type="button" className="bg-rose-600 flex px-8 py-4 rounded-md text-white items-center" disabled>
        <SpinnerGap data-testid="loading-spinner" className="animate-spin h-5 w-5 mr-3" size={32} />
        Processing...
      </button>
    </div>
  );
}