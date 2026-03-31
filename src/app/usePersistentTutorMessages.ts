import { TUTOR_MESSAGES_STORAGE_KEY } from './constants';
import { usePersistentState } from './usePersistentState';
import { normalizeTutorMessages } from '../lib/tutor-chat';

export function usePersistentTutorMessages() {
  return usePersistentState({
    key: TUTOR_MESSAGES_STORAGE_KEY,
    normalize: normalizeTutorMessages,
  });
}
