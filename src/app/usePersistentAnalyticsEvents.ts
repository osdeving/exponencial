import { normalizeAnalyticsEvents } from '../lib/analytics';
import { ANALYTICS_STORAGE_KEY } from './constants';
import { usePersistentState } from './usePersistentState';

export function usePersistentAnalyticsEvents() {
  return usePersistentState({
    key: ANALYTICS_STORAGE_KEY,
    normalize: normalizeAnalyticsEvents,
  });
}
