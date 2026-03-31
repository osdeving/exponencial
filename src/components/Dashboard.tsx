import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import * as Icons from 'lucide-react';
import { BookOpen, Medal, Star, Target, TrendingUp, Trophy, UserRound } from 'lucide-react';
import { TOPICS } from '../content';
import { BADGES, MOCK_RANKING } from '../config';
import { UserProfile, UserProgress } from '../types';
import { getTopicProgress } from '../lib/learning';

interface DashboardProps {
  progress: UserProgress;
  profile: UserProfile | null;
  onContinue: () => void;
  onOpenProfile: () => void;
  onResetProgress: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  profile,
  onContinue,
  onOpenProfile,
  onResetProgress,
}) => {
  const chartData = TOPICS.map((topic) => {
    const topicProgress = getTopicProgress(topic.id, progress);

    return {
      name: topic.title,
      score: topicProgress.averageScore,
      completion: topicProgress.completionPercent,
    };
  }).filter((entry, index) => entry.score > 0 || entry.completion > 0 || index < 12);

  const totalCompleted = progress.completedLessons.length;
  const avgScore =
    Object.values(progress.lessonScores).length > 0
      ? Math.round(
          Object.values(progress.lessonScores).reduce((total, score) => total + score, 0) /
            Object.values(progress.lessonScores).length,
        )
      : 0;
  const masteredTopics = TOPICS.filter((topic) => getTopicProgress(topic.id, progress).averageScore === 100).length;

  const ranking = [...MOCK_RANKING, { name: profile?.name ?? 'Você', points: progress.points, avatar: '' }].sort(
    (left, right) => right.points - left.points,
  );
  const userPosition = ranking.findIndex((entry) => entry.name === (profile?.name ?? 'Você')) + 1;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-end mb-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-3">Painel</p>
          <h1 className="font-display text-6xl uppercase">Seu Progresso</h1>
          <p className="font-medium mt-3 max-w-2xl">
            {profile
              ? `${profile.name}, sua meta atual é ${profile.weeklyGoal} aulas por semana com foco em ${profile.goal.toLowerCase()}.`
              : 'Configure seu perfil para personalizar trilhas e recomendações.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={onContinue} className="brutal-btn bg-brand">
            Continuar estudos
          </button>
          <button onClick={onOpenProfile} className="brutal-btn bg-white">
            {profile ? 'Editar perfil' : 'Criar perfil'}
          </button>
          <button onClick={onResetProgress} className="brutal-btn bg-white">
            Zerar progresso
          </button>
        </div>
      </div>

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
            <p className="text-sm font-bold uppercase opacity-70">Tópicos dominados</p>
            <p className="text-4xl font-display">{masteredTopics}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 min-w-0">
          <div className="brutal-border p-8 bg-white">
            <h3 className="font-display text-2xl uppercase mb-8">Desempenho por Tópico</h3>
            <div className="h-80 w-full min-w-0">
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

          <div className="brutal-border p-8 bg-white">
            <h3 className="font-display text-2xl uppercase mb-8 flex items-center gap-2">
              <Medal size={24} />
              Medalhas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {BADGES.map((badge) => {
                const isEarned = progress.badges.includes(badge.id);
                const Icon = (Icons as any)[badge.icon] || Medal;

                return (
                  <div
                    key={badge.id}
                    className={`brutal-border p-4 flex flex-col items-center text-center gap-2 ${
                      isEarned ? 'bg-brand/10' : 'opacity-40 grayscale'
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

        <div className="lg:col-span-1">
          <div className="brutal-border p-8 bg-white sticky top-24">
            <h3 className="font-display text-2xl uppercase mb-8 flex items-center gap-2">
              <TrendingUp size={24} />
              Ranking Semanal
            </h3>

            <div className="space-y-4">
              {ranking.slice(0, 5).map((user, index) => (
                <div key={`${user.name}-${index}`} className="flex items-center gap-4 p-3 brutal-border bg-white">
                  <div className="font-display text-xl w-6">{index + 1}</div>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 brutal-border object-cover" />
                  ) : (
                    <div className="w-10 h-10 brutal-border bg-brand flex items-center justify-center">
                      <UserRound size={18} />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="text-xs font-medium opacity-50">{user.points} pts</p>
                  </div>
                  {index === 0 && <Trophy size={18} className="text-yellow-500" />}
                </div>
              ))}

              <div className="mt-8 pt-8 border-t-2 border-dark border-dashed">
                <p className="text-[10px] font-bold uppercase opacity-50 mb-4">Sua posição</p>
                <div className="flex items-center gap-4 p-3 brutal-border bg-brand">
                  <div className="font-display text-xl w-6">{userPosition}</div>
                  <div className="w-10 h-10 brutal-border bg-white flex items-center justify-center font-bold">
                    {profile?.name?.slice(0, 1).toUpperCase() ?? 'U'}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{profile?.name ?? 'Você'}</p>
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
