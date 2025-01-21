import { useState, useEffect } from 'react';

function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    // Check if the item exists in localStorage, otherwise use the initial value
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key);
      return savedValue ? JSON.parse(savedValue) : initialValue;
    }
    return initialValue; // Return initial value if window is not available (server-side rendering)
  });

  // Effect to update localStorage whenever the state changes
  useEffect(() => {
    if (state !== undefined) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
