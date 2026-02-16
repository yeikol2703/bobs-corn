import { useCallback, useState } from 'react';
import { buyCorn } from '../services/api';
import type { BuyStatus } from '../types';

export interface UseBuyCornResult {
  status: BuyStatus;
  message: string;
  retryAfter: number | null;
  statusCode: number | null;
  handleBuyCorn: () => Promise<void>;
}

export interface UseBuyCornParams {
  onSuccess: (increment: number) => void;
}

/**
 * Hook for buy corn.
 */
export function useBuyCorn({ onSuccess }: UseBuyCornParams): UseBuyCornResult {
  const [state, setState] = useState<{
    status: BuyStatus;
    message: string;
    retryAfter: number | null;
    statusCode: number | null;
  }>({
    status: 'idle',
    message: '',
    retryAfter: null,
    statusCode: null,
  });

  const handleBuyCorn = useCallback(async () => {
    setState({ status: 'loading', message: '', retryAfter: null, statusCode: null });

    const result = await buyCorn();

    if (result.success) {
      onSuccess(1);
      setState({
        status: 'success',
        message: 'Corn purchased!',
        retryAfter: null,
        statusCode: result.statusCode,
      });
    } else if (result.retryAfterSeconds != null) {
      setState({
        status: 'rateLimited',
        message: result.error ?? 'Please wait before buying again.',
        retryAfter: result.retryAfterSeconds,
        statusCode: result.statusCode,
      });
    } else {
      setState({
        status: 'error',
        message: result.error ?? 'Something went wrong.',
        retryAfter: null,
        statusCode: result.statusCode,
      });
    }
  }, [onSuccess]);

  return {
    status: state.status,
    message: state.message,
    retryAfter: state.retryAfter,
    statusCode: state.statusCode,
    handleBuyCorn,
  };
}
