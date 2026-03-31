import { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { normalizeProfile } from '../lib/learning';
import { PROFILE_STORAGE_KEY } from './constants';
import { readStoredJson } from './storage';

export function usePersistentProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(() => normalizeProfile(readStoredJson(PROFILE_STORAGE_KEY)));

  useEffect(() => {
    if (profile) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      return;
    }

    localStorage.removeItem(PROFILE_STORAGE_KEY);
  }, [profile]);

  return [profile, setProfile] as const;
}
