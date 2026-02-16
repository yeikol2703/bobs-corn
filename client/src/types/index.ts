/** Result of a buy corn request */
export type BuyCornResult =
  | { success: true; data: BuyCornSuccessData; statusCode: number }
  | { success: false; error: string; retryAfterSeconds?: number; statusCode: number };

export interface BuyCornSuccessData {
  corn: string;
  message: string;
}

export interface BuyCornErrorData {
  error: string;
  message?: string;
  retryAfterSeconds?: number;
}

/** UI status for the buy corn flow */
export type BuyStatus = 'idle' | 'loading' | 'success' | 'rateLimited' | 'error';
