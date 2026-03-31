import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { readStoredJson, removeStoredValue, writeStoredJson } from './storage';

interface UsePersistentStateOptions<T> {
  key: string;
  normalize: (raw: unknown) => T;
  shouldPersist?: (value: T) => boolean;
}

export function usePersistentState<T>({
  key,
  normalize,
  shouldPersist = () => true,
}: UsePersistentStateOptions<T>): readonly [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => normalize(readStoredJson(key)));

  useEffect(() => {
    if (!shouldPersist(state)) {
      removeStoredValue(key);
      return;
    }

    writeStoredJson(key, state);
  }, [key, state]);

  return [state, setState] as const;
}
