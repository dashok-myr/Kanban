import { Dispatch, SetStateAction, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedLocallyValue, setStoredLocallyValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  return [
    storedLocallyValue,
    (newValue) => {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredLocallyValue(newValue);
    },
  ] as [T, Dispatch<SetStateAction<T>>];
}
