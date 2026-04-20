import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { readStoredJson, removeStoredValue, writeStoredJson } from './storage';

interface UsePersistentStateOptions<T> {
  key: string;
  normalize: (raw: unknown) => T;
  shouldPersist?: (value: T) => boolean;
}

// Hook generico para estados local-first: le do storage, normaliza e persiste a cada mudanca.
export function usePersistentState<T>({
  key,
  normalize,
  shouldPersist = () => true,
}: UsePersistentStateOptions<T>): readonly [T, Dispatch<SetStateAction<T>>] {
  // Inicializador lazy: o storage so e lido uma vez, na primeira montagem.
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
