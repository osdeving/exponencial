import { normalizeProgress } from '../lib/learning';
import { PROGRESS_STORAGE_KEY } from './constants';
import { usePersistentState } from './usePersistentState';

export function usePersistentProgress() {
  return usePersistentState({
    key: PROGRESS_STORAGE_KEY,
    normalize: normalizeProgress,
  });
}
