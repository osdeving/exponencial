import React from 'react';
import { motion } from 'motion/react';
import { Topic } from '../types';
import * as Icons from 'lucide-react';
import { resolveLucideIcon } from '../lib/icons';
import { getContentStatusLabel, getTopicBranchLabel } from '../lib/learning';

interface TopicCardProps {
  topic: Topic;
  lessonCount: number;
  exerciseCount: number;
  progressPercent: number;
  isFavorite?: boolean;
  onClick: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  lessonCount,
  exerciseCount,
  progressPercent,
  isFavorite = false,
  onClick,
}) => {
  const Icon = resolveLucideIcon(topic.icon, Icons.BookOpen);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="brutal-border p-6 cursor-pointer bg-white flex flex-col gap-4"
    >
      <div className="flex justify-between items-start">
        <div className="p-3 bg-brand brutal-border">
          <Icon size={24} />
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-bold uppercase tracking-widest opacity-50">
            {topic.level}
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-widest opacity-50">
            {topic.stage}
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-widest">{getContentStatusLabel(topic.status ?? 'outline')}</span>
          {isFavorite && <span className="block text-[10px] font-bold uppercase tracking-widest">Favorito</span>}
        </div>
      </div>
      
      <div>
        <h3 className="font-display text-2xl uppercase leading-none mb-1">
          {topic.title}
        </h3>
        <p className="text-sm text-dark/70 font-medium">
          {topic.description}
        </p>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
          <span>{lessonCount} lições</span>
          <span className="text-right">{exerciseCount} exercícios</span>
        </div>
        <div className="flex items-center justify-between text-[10px] font-bold uppercase">
          <span>Progresso</span>
          <span>{progressPercent}% concluído</span>
        </div>
        <div className="h-2 brutal-border overflow-hidden bg-dark/10">
          <div className="h-full bg-brand" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-dark/10 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase">{getTopicBranchLabel(topic)}</span>
        <Icons.ArrowRight size={16} />
      </div>
    </motion.div>
  );
};
