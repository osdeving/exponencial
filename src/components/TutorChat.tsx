import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import { Topic, Lesson } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface TutorChatProps {
  currentTopic?: Topic | null;
  currentLesson?: Lesson | null;
}

export const TutorChat: React.FC<TutorChatProps> = ({ currentTopic, currentLesson }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('tutor-messages');
    return saved ? JSON.parse(saved) : [
      { role: 'model', text: 'Olá! Sou seu tutor de matemática. Como posso te ajudar hoje? Posso explicar teorias, dar dicas de exercícios ou resolver dúvidas passo a passo.' }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('tutor-messages', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([
      { role: 'model', text: 'Chat limpo! Como posso te ajudar agora?' }
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const contextPrompt = `
        Você é um tutor de matemática amigável e didático da plataforma Exponencial. 
        Sua missão é ajudar alunos do ensino fundamental e médio. 
        Sempre tente explicar o raciocínio por trás das fórmulas. 
        Se o aluno pedir para resolver um exercício, tente dar dicas primeiro antes de dar a resposta completa.
        Use Markdown para formatar fórmulas matemáticas (ex: $x^2$, $\\frac{a}{b}$).
        
        CONTEXTO ATUAL:
        ${currentTopic ? `Tópico: ${currentTopic.title} (${currentTopic.category})` : 'Nenhum tópico selecionado'}
        ${currentLesson ? `Lição: ${currentLesson.title}` : 'Nenhuma lição selecionada'}
      `;

      const stream = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: contextPrompt }]},
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }]}
        ]
      });

      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullText;
          return newMessages;
        });
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Opa, parece que tive um problema técnico. Tente novamente em instantes!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="brutal-border bg-white w-80 md:w-96 h-[500px] flex flex-col mb-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-dark text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-brand p-1 brutal-border text-dark">
                  <Bot size={18} />
                </div>
                <span className="font-display uppercase tracking-tight">Tutor Exponencial</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat} 
                  className="hover:text-brand p-1"
                  title="Limpar conversa"
                >
                  <Trash2 size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:text-brand p-1">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper/50">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[90%] p-3 brutal-border text-sm",
                    m.role === 'user' ? "bg-brand" : "bg-white"
                  )}>
                    <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-dark prose-pre:text-white">
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1].text === "" && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 brutal-border flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-xs font-bold uppercase">Pensando...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t-2 border-dark flex gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tire sua dúvida..."
                className="flex-1 brutal-border px-3 py-2 text-sm focus:outline-none focus:bg-brand/10"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="brutal-border bg-brand p-2 hover:bg-dark hover:text-white transition-colors disabled:opacity-50"
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
        onClick={() => setIsOpen(!isOpen)}
        className="brutal-border bg-brand p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
