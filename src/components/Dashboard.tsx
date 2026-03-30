import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserProgress } from '../types';
import { TOPICS, MOCK_RANKING, BADGES } from '../data';
import { Trophy, BookOpen, Target, Medal, Star, TrendingUp } from 'lucide-react';
import * as Icons from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress }) => {
  const chartData = TOPICS.map(t => ({
    name: t.title,
    score: progress.scores[t.id] || 0
  }));

  const totalCompleted = progress.completedLessons.length;
  const avgScore = Object.values(progress.scores).length > 0 
    ? Math.round(Object.values(progress.scores).reduce((a, b) => a + b, 0) / Object.values(progress.scores).length * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="font-display text-6xl uppercase mb-12">Seu Progresso</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="brutal-border p-6 bg-brand flex items-center gap-4">
          <div className="p-3 bg-white brutal-border">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase opacity-70">Lições</p>
            <p className="text-4xl font-display">{totalCompleted}</p>
          </div>
        </div>

        <div className="brutal-border p-6 bg-white flex items-center gap-4">
          <div className="p-3 bg-brand brutal-border">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase opacity-70">Média</p>
            <p className="text-4xl font-display">{avgScore}%</p>
          </div>
        </div>

        <div className="brutal-border p-6 bg-yellow-400 flex items-center gap-4">
          <div className="p-3 bg-white brutal-border">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase opacity-70">Pontos</p>
            <p className="text-4xl font-display">{progress.points}</p>
          </div>
        </div>

        <div className="brutal-border p-6 bg-dark text-white flex items-center gap-4">
          <div className="p-3 bg-brand text-dark brutal-border">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase opacity-70">Nível</p>
            <p className="text-4xl font-display">{Math.floor(progress.points / 500) + 1}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 space-y-8">
          <div className="brutal-border p-8 bg-white">
            <h3 className="font-display text-2xl uppercase mb-8">Desempenho por Tópico</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#000" strokeOpacity={0.1} />
                  <XAxis dataKey="name" axisLine={{ stroke: '#000' }} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis axisLine={{ stroke: '#000' }} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <Tooltip 
                    contentStyle={{ border: '2px solid #000', borderRadius: '0', fontWeight: 'bold' }}
                    cursor={{ fill: '#00FF00', opacity: 0.2 }}
                  />
                  <Bar dataKey="score" fill="#00FF00" stroke="#000" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Badges */}
          <div className="brutal-border p-8 bg-white">
            <h3 className="font-display text-2xl uppercase mb-8 flex items-center gap-2">
              <Medal size={24} />
              Suas Medalhas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {BADGES.map(badge => {
                const isEarned = progress.badges.includes(badge.id);
                const Icon = (Icons as any)[badge.icon] || Medal;
                return (
                  <div 
                    key={badge.id}
                    className={`brutal-border p-4 flex flex-col items-center text-center gap-2 transition-all ${
                      isEarned ? 'bg-brand/10' : 'opacity-30 grayscale'
                    }`}
                  >
                    <div className={`p-3 brutal-border ${isEarned ? 'bg-brand' : 'bg-white'}`}>
                      <Icon size={24} />
                    </div>
                    <p className="font-bold uppercase text-xs">{badge.title}</p>
                    <p className="text-[10px] font-medium leading-tight">{badge.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ranking */}
        <div className="lg:col-span-1">
          <div className="brutal-border p-8 bg-white sticky top-24">
            <h3 className="font-display text-2xl uppercase mb-8 flex items-center gap-2">
              <TrendingUp size={24} />
              Ranking Semanal
            </h3>
            <div className="space-y-4">
              {MOCK_RANKING.map((user, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 brutal-border bg-white hover:bg-brand/5 transition-colors">
                  <div className="font-display text-xl w-6">{idx + 1}</div>
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 brutal-border" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="text-xs font-medium opacity-50">{user.points} pts</p>
                  </div>
                  {idx === 0 && <Trophy size={18} className="text-yellow-500" />}
                </div>
              ))}
              
              {/* Current User */}
              <div className="mt-8 pt-8 border-t-2 border-dark border-dashed">
                <p className="text-[10px] font-bold uppercase opacity-50 mb-4">Sua Posição</p>
                <div className="flex items-center gap-4 p-3 brutal-border bg-brand">
                  <div className="font-display text-xl w-6">12</div>
                  <div className="w-10 h-10 brutal-border bg-white flex items-center justify-center font-bold">U</div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">Você</p>
                    <p className="text-xs font-medium opacity-50">{progress.points} pts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
