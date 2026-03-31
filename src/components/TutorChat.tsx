import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bot, Lightbulb, MessageSquare, Send, Trash2, User, X } from 'lucide-react';
import { usePersistentTutorMessages } from '../app/usePersistentTutorMessages';
import { cn } from '../lib/utils';
import { generateTutorReply, TUTOR_SUGGESTIONS } from '../lib/tutor';
import { RESET_TUTOR_MESSAGES, TutorMessage } from '../lib/tutor-chat';
import { Lesson, Question, Topic } from '../types';
import { MarkdownContent } from './MarkdownContent';

interface TutorChatProps {
  currentTopic?: Topic | null;
  currentLesson?: Lesson | null;
  currentLessonQuestions?: Question[];
}

export const TutorChat: React.FC<TutorChatProps> = ({
  currentTopic,
  currentLesson,
  currentLessonQuestions = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = usePersistentTutorMessages();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const clearChat = () => {
    setMessages(RESET_TUTOR_MESSAGES);
  };

  const sendMessage = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    const reply = generateTutorReply(trimmed, currentTopic, currentLesson, currentLessonQuestions);
    setMessages((previous: TutorMessage[]) => [...previous, { role: 'user', text: trimmed }, { role: 'assistant', text: reply }]);
    setInput('');
  };

  const contextLabel = currentLesson
    ? `Lição: ${currentLesson.title}`
    : currentTopic
      ? `Tópico: ${currentTopic.title}`
      : 'Sem contexto aberto';

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="brutal-border bg-white w-[min(92vw,420px)] h-[540px] flex flex-col mb-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            <div className="bg-dark text-white p-4 flex justify-between items-start gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-brand p-1 brutal-border text-dark">
                    <Bot size={18} />
                  </div>
                  <span className="font-display uppercase tracking-tight">Tutor Exponencial</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-60">{contextLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearChat} className="hover:text-brand p-1" title="Limpar conversa">
                  <Trash2 size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:text-brand p-1">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-3 border-b-2 border-dark bg-brand/20">
              <div className="flex flex-wrap gap-2">
                {TUTOR_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    className="brutal-border bg-white px-3 py-2 text-[10px] font-bold uppercase"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper/50">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div className="max-w-[90%]">
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase opacity-50">
                      {message.role === 'user' ? <User size={12} /> : <Lightbulb size={12} />}
                      <span>{message.role === 'user' ? 'Você' : 'Tutor'}</span>
                    </div>
                    <div
                      className={cn(
                        'p-3 brutal-border text-sm',
                        message.role === 'user' ? 'bg-brand' : 'bg-white',
                      )}
                    >
                      <MarkdownContent
                        content={message.text}
                        className="prose-sm prose-p:leading-relaxed prose-pre:bg-dark prose-pre:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t-2 border-dark flex gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && sendMessage(input)}
                placeholder="Pergunte algo sobre a lição..."
                className="flex-1 brutal-border px-3 py-2 text-sm focus:outline-none focus:bg-brand/10"
              />
              <button
                onClick={() => sendMessage(input)}
                className="brutal-border bg-brand p-2 hover:bg-dark hover:text-white transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen((previous) => !previous)}
        className="relative brutal-border bg-brand p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 bg-dark text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
            AI
          </div>
        )}
      </motion.button>
    </div>
  );
};
