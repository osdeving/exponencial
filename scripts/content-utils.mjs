import fs from 'node:fs/promises';
import path from 'node:path';

export const projectRoot = process.cwd();
export const contentRoot = path.join(projectRoot, 'src', 'content');
export const generatedRoot = path.join(projectRoot, 'src', 'generated');

export function isTopicMarkdownFile(filePath) {
  return path.basename(filePath) === '_topic.md';
}

export function isQuestionMarkdownFile(filePath) {
  return path.basename(filePath).endsWith('.questions.md');
}

export function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function padOrder(order) {
  return String(order).padStart(2, '0');
}

export function escapeTemplateLiteral(value) {
  return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function parseScalar(rawValue) {
  const value = rawValue.trim();

  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }

  return value;
}

export function parseFrontmatter(source, filePath) {
  if (!source.startsWith('---\n')) {
    throw new Error(`Arquivo sem frontmatter YAML: ${filePath}`);
  }

  const closingIndex = source.indexOf('\n---\n');
  if (closingIndex === -1) {
    throw new Error(`Frontmatter não fechado corretamente: ${filePath}`);
  }

  const rawFrontmatter = source.slice(4, closingIndex);
  const content = source.slice(closingIndex + 5).trim();
  const data = {};
  let currentArrayKey = null;

  for (const line of rawFrontmatter.split('\n')) {
    if (!line.trim()) {
      continue;
    }

    const arrayMatch = line.match(/^\s*-\s+(.*)$/);
    if (arrayMatch) {
      if (!currentArrayKey) {
        throw new Error(`Item de lista sem chave ativa em ${filePath}: ${line}`);
      }

      data[currentArrayKey].push(parseScalar(arrayMatch[1]));
      continue;
    }

    const keyMatch = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!keyMatch) {
      throw new Error(`Linha de frontmatter inválida em ${filePath}: ${line}`);
    }

    const [, key, rawValue = ''] = keyMatch;
    if (rawValue === '') {
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    data[key] = parseScalar(rawValue);
    currentArrayKey = null;
  }

  return { data, content };
}

export function serializeFrontmatter(data) {
  const lines = ['---'];

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${item}`);
      }
      continue;
    }

    lines.push(`${key}: ${value}`);
  }

  lines.push('---', '');
  return lines.join('\n');
}

export async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function writeFileIfMissing(filePath, content) {
  try {
    await fs.access(filePath);
    return false;
  } catch {
    await ensureDirectory(path.dirname(filePath));
    await fs.writeFile(filePath, content, 'utf8');
    return true;
  }
}

export async function getMarkdownFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getMarkdownFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files.sort();
}
