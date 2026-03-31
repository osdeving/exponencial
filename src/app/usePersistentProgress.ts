import { useEffect, useState } from 'react';
import { UserProgress } from '../types';
import { normalizeProgress } from '../lib/learning';
import { PROGRESS_STORAGE_KEY } from './constants';
import { readStoredJson } from './storage';

export function usePersistentProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => normalizeProgress(readStoredJson(PROGRESS_STORAGE_KEY)));

  useEffect(() => {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  return [progress, setProgress] as const;
}
