import type { BuyStatus } from '../types';

interface BuyCornButtonProps {
  status: BuyStatus;
  message: string;
  retryAfter: number | null;
  onBuy: () => void;
}

export function BuyCornButton({ status, message, retryAfter, onBuy }: BuyCornButtonProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={onBuy}
        disabled={status === 'loading'}
        className="w-full max-w-md py-4 bg-[rgb(244_202_37/var(--tw-bg-opacity,1))] hover:brightness-95 disabled:opacity-60 disabled:brightness-100 disabled:cursor-not-allowed text-black font-semibold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(244,202,37,0.4)] transition-all duration-200 text-lg inline-flex items-center justify-center gap-2"
      >
        {status === 'loading' ? 'Buying...' : (
          <>
            Buy Corn <img src="/corn-icon.png" alt="" className="w-5 h-5 inline-block align-middle object-contain" aria-hidden />
          </>
        )}
      </button>
    </div>
  );
}
