const UNLOCK_ALL_LESSONS_STORAGE_KEY = 'exponencial:unlock-all-lessons';

function isTruthyFlag(value: string | null | undefined) {
  return value === '1' || value === 'true' || value === 'yes';
}

function isFalsyFlag(value: string | null | undefined) {
  return value === '0' || value === 'false' || value === 'no';
}

function getBrowserUnlockOverride() {
  if (typeof window === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  const queryValue = params.get('unlockLessons') ?? params.get('unlockAllLessons');

  if (isTruthyFlag(queryValue)) {
    window.localStorage.setItem(UNLOCK_ALL_LESSONS_STORAGE_KEY, 'true');
    return true;
  }

  if (isFalsyFlag(queryValue)) {
    window.localStorage.removeItem(UNLOCK_ALL_LESSONS_STORAGE_KEY);
    return false;
  }

  return window.localStorage.getItem(UNLOCK_ALL_LESSONS_STORAGE_KEY) === 'true';
}

function getBuildTimeUnlockFlag() {
  const env = (import.meta as ImportMeta & { env?: { VITE_UNLOCK_ALL_LESSONS?: string } }).env;
  return env?.VITE_UNLOCK_ALL_LESSONS;
}

// Flag de teste: libera a leitura de todas as aulas sem marcar progresso nem dar pontos.
export function isLessonUnlockBypassEnabled() {
  return isTruthyFlag(getBuildTimeUnlockFlag()) || getBrowserUnlockOverride();
}

export const LESSON_UNLOCK_BYPASS_STORAGE_KEY = UNLOCK_ALL_LESSONS_STORAGE_KEY;
