interface CornCounterProps {
  count: number;
}

export function CornCounter({ count }: CornCounterProps) {
  return (
    <div className="text-center mb-10">
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
        Corn in your basket
      </p>
      <div className="flex items-center justify-center gap-3">
        <span className="text-6xl text-gray-900">{count}</span>
        <img src="/corn-icon.png" alt="" className="w-12 h-12 object-contain" aria-hidden />
      </div>
    </div>
  );
}
