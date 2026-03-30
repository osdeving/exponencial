import React from 'react';
import { motion } from 'motion/react';
import { Topic } from '../types';
import { cn } from '../lib/utils';
import * as Icons from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  const Icon = (Icons as any)[topic.icon] || Icons.BookOpen;

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
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
          {topic.level}
        </span>
      </div>
      
      <div>
        <h3 className="font-display text-2xl uppercase leading-none mb-1">
          {topic.title}
        </h3>
        <p className="text-sm text-dark/70 font-medium">
          {topic.description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-dark/10 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase">{topic.category}</span>
        <Icons.ArrowRight size={16} />
      </div>
    </motion.div>
  );
};
