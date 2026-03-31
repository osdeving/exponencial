import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type LucideIconModule = typeof Icons;

function isLucideIcon(value: unknown): value is LucideIcon {
  return typeof value === 'function';
}

export function resolveLucideIcon(name: string | undefined, fallback: LucideIcon): LucideIcon {
  if (!name) {
    return fallback;
  }

  const candidate = Icons[name as keyof LucideIconModule];
  return isLucideIcon(candidate) ? candidate : fallback;
}
