import { useState, useEffect } from 'react';

const CORN_COUNT_KEY = 'bobs-corn-corn-count';

/**
 * Hook for corn count state with localStorage persistence.
 */
export function useCornCount(): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [cornCount, setCornCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CORN_COUNT_KEY);
    if (stored !== null) {
      setCornCount(parseInt(stored, 10) || 0);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CORN_COUNT_KEY, String(cornCount));
    }
  }, [cornCount, isHydrated]);

  return [cornCount, setCornCount];
}
