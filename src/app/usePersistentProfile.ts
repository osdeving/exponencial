import { normalizeProfile } from '../lib/learning';
import { PROFILE_STORAGE_KEY } from './constants';
import { usePersistentState } from './usePersistentState';

export function usePersistentProfile() {
  return usePersistentState({
    key: PROFILE_STORAGE_KEY,
    normalize: normalizeProfile,
    shouldPersist: (profile) => profile !== null,
  });
}
