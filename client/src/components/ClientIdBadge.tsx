interface ClientIdBadgeProps {
  clientId: string;
}

export function ClientIdBadge({ clientId }: ClientIdBadgeProps) {
  return (
    <p className="text-center text-gray-500 text-xs mt-8 font-mono truncate max-w-full px-4">
      Client: {clientId.slice(0, 8)}…
    </p>
  );
}
