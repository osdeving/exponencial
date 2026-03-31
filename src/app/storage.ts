import { DEFAULT_PROGRESS, normalizeProfile, normalizeProgress } from '../lib/learning';
import { UserProfile, UserProgress } from '../types';
import { PROFILE_STORAGE_KEY, PROGRESS_STORAGE_KEY } from './constants';

export type AppSessionMode = 'local';

export interface AppSessionDescriptor {
  mode: AppSessionMode;
  actorId: string;
  actorLabel: string;
}

export interface StorageDriver {
  read: (key: string) => string | null;
  write: (key: string, value: string) => void;
  remove: (key: string) => void;
}

export interface AppStorageSnapshotV1 {
  kind: 'exponencial/storage-snapshot';
  version: 1;
  exportedAt: string;
  session: AppSessionDescriptor;
  profile: UserProfile | null;
  progress: UserProgress;
}

export const STORAGE_SNAPSHOT_VERSION = 1;

export const browserStorageDriver: StorageDriver = {
  read(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      return;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      return;
    }
  },
};

export function createLocalSessionDescriptor(profile: UserProfile | null): AppSessionDescriptor {
  return {
    mode: 'local',
    actorId: 'browser-local',
    actorLabel: profile?.name?.trim() || 'Sessao local deste navegador',
  };
}

export function readStoredJson(key: string, driver: StorageDriver = browserStorageDriver) {
  try {
    const value = driver.read(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function writeStoredJson(key: string, value: unknown, driver: StorageDriver = browserStorageDriver) {
  try {
    driver.write(key, JSON.stringify(value));
  } catch {
    return;
  }
}

export function removeStoredValue(key: string, driver: StorageDriver = browserStorageDriver) {
  try {
    driver.remove(key);
  } catch {
    return;
  }
}

export function buildStorageSnapshot({
  profile,
  progress,
}: {
  profile: UserProfile | null;
  progress: UserProgress;
}): AppStorageSnapshotV1 {
  return {
    kind: 'exponencial/storage-snapshot',
    version: STORAGE_SNAPSHOT_VERSION,
    exportedAt: new Date().toISOString(),
    session: createLocalSessionDescriptor(profile),
    profile,
    progress,
  };
}

export function serializeStorageSnapshot(snapshot: AppStorageSnapshotV1) {
  return JSON.stringify(snapshot, null, 2);
}

export function parseStorageSnapshot(raw: string): { profile: UserProfile | null; progress: UserProgress } {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('O arquivo selecionado nao contem JSON valido.');
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('O snapshot precisa ser um objeto JSON.');
  }

  const value = parsed as Record<string, unknown>;
  if (value.kind !== 'exponencial/storage-snapshot' || value.version !== STORAGE_SNAPSHOT_VERSION) {
    throw new Error('Formato de snapshot nao reconhecido por esta versao do app.');
  }

  return {
    profile: normalizeProfile(value.profile),
    progress: normalizeProgress(value.progress ?? DEFAULT_PROGRESS),
  };
}

export function buildStorageSnapshotFilename() {
  const stamp = new Date().toISOString().slice(0, 10);
  return `exponencial-local-backup-${stamp}.json`;
}

export function exportSnapshotToBrowser(snapshot: AppStorageSnapshotV1) {
  const blob = new Blob([serializeStorageSnapshot(snapshot)], { type: 'application/json' });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = buildStorageSnapshotFilename();
  link.click();
  URL.revokeObjectURL(objectUrl);
}

export function readCurrentStorageSnapshot() {
  return {
    profile: normalizeProfile(readStoredJson(PROFILE_STORAGE_KEY)),
    progress: normalizeProgress(readStoredJson(PROGRESS_STORAGE_KEY)),
  };
}
