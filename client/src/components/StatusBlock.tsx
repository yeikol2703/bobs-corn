import type { BuyStatus } from '../types';

interface StatusBlockProps {
  status: BuyStatus;
  message: string;
  retryAfterSeconds?: number | null;
  statusCode?: number | null;
}

function getStatusMessage(status: BuyStatus, message: string, retryAfterSeconds?: number | null): string {
  if (status === 'idle') return 'Ready to buy!';
  if (status === 'loading') return 'Buying...';
  if (status === 'success') return message || 'Corn purchased!';
  if (status === 'rateLimited' && retryAfterSeconds != null) {
    return `${message || 'Please wait.'} Try again in ~${retryAfterSeconds}s`;
  }
  if (status === 'rateLimited' || status === 'error') return message || 'Ready to buy!';
  return 'Ready to buy!';
}

function getMessageColorClass(status: BuyStatus): string {
  if (status === 'success') return 'text-green-600';
  if (status === 'rateLimited' || status === 'error') return 'text-red-600';
  return 'text-gray-900';
}

export function StatusBlock({ status, message, retryAfterSeconds, statusCode }: StatusBlockProps) {
  const text = getStatusMessage(status, message, retryAfterSeconds);
  const colorClass = getMessageColorClass(status);
  const label = statusCode != null ? `Status (${statusCode})` : 'Status';
  return (
    <div>
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-medium text-sm ${colorClass}`}>
        {text}
      </p>
    </div>
  );
}
