export interface TutorMessage {
  role: 'user' | 'assistant';
  text: string;
}

export const DEFAULT_TUTOR_MESSAGES: TutorMessage[] = [
  {
    role: 'assistant',
    text: 'Sou o tutor da Exponencial. Posso resumir a lição, sugerir exercício, explicar fórmula ou montar um plano de estudo.',
  },
];

export const RESET_TUTOR_MESSAGES: TutorMessage[] = [
  {
    role: 'assistant',
    text: 'Conversa reiniciada. Posso retomar com resumo, exemplo, dica ou exercício.',
  },
];

export function normalizeTutorMessages(raw: unknown): TutorMessage[] {
  if (!Array.isArray(raw)) {
    return DEFAULT_TUTOR_MESSAGES;
  }

  const messages = raw.flatMap((message) => {
    if (!message || typeof message !== 'object') {
      return [];
    }

    const { role, text } = message as Record<string, unknown>;
    if ((role !== 'user' && role !== 'assistant') || typeof text !== 'string' || text.trim().length === 0) {
      return [];
    }

    return [
      {
        role: role as TutorMessage['role'],
        text: text.trim(),
      },
    ];
  });

  return messages.length > 0 ? messages : DEFAULT_TUTOR_MESSAGES;
}
