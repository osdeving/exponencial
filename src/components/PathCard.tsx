import React from 'react';
import { motion } from 'motion/react';
import { LearningPath } from '../types';
import { ArrowRight, Layers } from 'lucide-react';

interface PathCardProps {
  path: LearningPath;
  onClick: () => void;
}

export const PathCard: React.FC<PathCardProps> = ({ path, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="brutal-border p-6 cursor-pointer relative overflow-hidden group"
      style={{ backgroundColor: path.color }}
    >
      <div className="relative z-10">
        <div className="bg-white brutal-border p-2 w-fit mb-4">
          <Layers size={20} />
        </div>
        <h3 className="font-display text-3xl uppercase leading-none mb-2">{path.title}</h3>
        <p className="text-sm font-medium opacity-80 mb-6">{path.description}</p>
        
        <div className="flex items-center gap-2 font-bold uppercase text-xs">
          <span>Ver Trilha</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Layers size={120} />
      </div>
    </motion.div>
  );
};
