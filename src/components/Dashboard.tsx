import React, { useMemo, useRef } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Download,
  HardDrive,
  Medal,
  RefreshCcw,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Upload,
  UserRound,
} from 'lucide-react';
import { TOPICS } from '../content';
import { BADGES, MOCK_RANKING } from '../config';
import { resolveLucideIcon } from '../lib/icons';
import { buildCanonicalMasteryOverview } from '../lib/mastery';
import { buildRecoveryOverview } from '../lib/recovery';
import { ProductAnalyticsSummary, UserProfile, UserProgress } from '../types';
import { getTopicProgress } from '../lib/learning';

interface DashboardProps {
  progress: UserProgress;
  profile: UserProfile | null;
  sessionLabel: string;
  analyticsSummary: ProductAnalyticsSummary;
  onContinue: () => void;
  onExportSnapshot: () => void;
  onImportSnapshot: (file: File) => void | Promise<void>;
  onOpenProfile: () => void;
  onResetProgress: () => void;
}

interface DashboardStatCardProps {
  className: string;
  icon: React.ReactNode;
  iconClassName: string;
  label: string;
  value: React.ReactNode;
}

function DashboardStatCard({ className, icon, iconClassName, label, value }: DashboardStatCardProps) {
  return (
    <div className={`brutal-border min-w-0 overflow-hidden p-5 sm:p-6 ${className}`}>
      <div className="grid h-full min-w-0 grid-cols-[auto_1fr] items-center gap-4 xl:grid-cols-1 xl:items-start">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center brutal-border ${iconClassName}`}>{icon}</div>
        <div className="min-w-0 max-w-full">
          <p className="max-w-full text-[clamp(0.625rem,0.7vw,0.875rem)] font-bold uppercase leading-tight opacity-70">
            {label}
          </p>
          <p className="mt-1 max-w-full font-display text-[clamp(1.875rem,2.2vw,2.5rem)] leading-none">{value}</p>
        </div>
      </div>
    </div>
  );
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  profile,
  sessionLabel,
  analyticsSummary,
  onContinue,
  onExportSnapshot,
  onImportSnapshot,
  onOpenProfile,
  onResetProgress,
}) => {
  const importInputRef = useRef<HTMLInputElement>(null);
  const masteryOverview = useMemo(() => buildCanonicalMasteryOverview(progress), [progress]);
  const recoveryOverview = useMemo(() => buildRecoveryOverview(progress), [progress]);
  const debtBuckets = masteryOverview.activeDebtBuckets.slice(0, 6);
  const masteryCoverage = masteryOverview.totalSkills === 0 ? 0 : Math.round((masteryOverview.attemptedSkills / masteryOverview.totalSkills) * 100);
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

  const ranking = [...MOCK_RANKING, { name: profile?.name ?? 'Você', points: progress.points, avatar: '' }].sort(
    (left, right) => right.points - left.points,
  );
  const userPosition = ranking.findIndex((entry) => entry.name === (profile?.name ?? 'Você')) + 1;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-end mb-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-3">Painel</p>
          <h1 className="font-display text-6xl uppercase">Seu Progresso</h1>
          <p className="font-medium mt-3 max-w-2xl">
            {profile
              ? `${profile.name}, sua meta atual é ${profile.weeklyGoal} aulas por semana com foco em ${profile.goal.toLowerCase()}.`
              : 'Configure seu perfil para personalizar trilhas e recomendações.'}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white px-3 py-2 brutal-border text-[10px] font-bold uppercase tracking-[0.2em]">
            <HardDrive size={14} />
            <span>{sessionLabel}</span>
          </div>
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
          <button onClick={onExportSnapshot} className="brutal-btn bg-white">
            <Download size={16} />
            Exportar backup
          </button>
          <button onClick={() => importInputRef.current?.click()} className="brutal-btn bg-white">
            <Upload size={16} />
            Restaurar backup
          </button>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void onImportSnapshot(file);
              }
              event.currentTarget.value = '';
            }}
          />
        </div>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <DashboardStatCard
          className="bg-brand"
          icon={<BookOpen size={24} />}
          iconClassName="bg-white"
          label="Lições"
          value={totalCompleted}
        />

        <DashboardStatCard
          className="bg-white"
          icon={<Target size={24} />}
          iconClassName="bg-brand"
          label="Média"
          value={`${avgScore}%`}
        />

        <DashboardStatCard
          className="bg-yellow-400"
          icon={<Star size={24} />}
          iconClassName="bg-white"
          label="Pontos"
          value={progress.points}
        />

        <DashboardStatCard
          className="bg-dark text-white"
          icon={<ShieldCheck size={24} />}
          iconClassName="bg-brand text-dark"
          label="Habilidades dominadas"
          value={
            <>
              {masteryOverview.masteredSkills}
              <span className="text-[clamp(0.875rem,1.1vw,1.125rem)]">/{masteryOverview.totalSkills}</span>
            </>
          }
        />

        <DashboardStatCard
          className="bg-red-200"
          icon={<AlertTriangle size={24} />}
          iconClassName="bg-white"
          label="Dívida ativa"
          value={masteryOverview.activeDebtSkills}
        />

        <DashboardStatCard
          className="bg-sky-200"
          icon={<RefreshCcw size={24} />}
          iconClassName="bg-white"
          label="Recuperações"
          value={recoveryOverview.pendingAssignments}
        />
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
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8">
              <div>
                <h3 className="font-display text-2xl uppercase">Dívida Matemática</h3>
                <p className="text-sm font-medium mt-2 max-w-2xl">
                  O ledger canônico já rastreia {masteryOverview.attemptedSkills} de {masteryOverview.totalSkills}{' '}
                  habilidades mapeadas. Hoje, {masteryOverview.activeDebtSkills} ainda precisam passar do corte de{' '}
                  80%.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 bg-brand px-3 py-2 brutal-border text-[10px] font-bold uppercase tracking-[0.2em]">
                <ShieldCheck size={14} />
                <span>Cobertura {masteryCoverage}%</span>
              </div>
            </div>

            {debtBuckets.length > 0 ? (
              <div className="space-y-4">
                {debtBuckets.map((bucket) => {
                  const debtPercent =
                    bucket.totalSkills === 0 ? 0 : Math.round((bucket.activeDebtSkills / bucket.totalSkills) * 100);

                  return (
                    <div key={bucket.subsectionId} className="brutal-border p-4 bg-stone-50">
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.24em] opacity-50">
                            {bucket.branchTitle}
                          </p>
                          <h4 className="font-bold text-lg">{bucket.subsectionTitle}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-[0.24em] opacity-50">Em dívida</p>
                          <p className="font-display text-3xl">{bucket.activeDebtSkills}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-xs font-bold uppercase">
                        <div className="brutal-border bg-white px-3 py-2">
                          <span className="opacity-50 block mb-1">Domínio</span>
                          <span>{bucket.masteredSkills}/{bucket.totalSkills}</span>
                        </div>
                        <div className="brutal-border bg-white px-3 py-2">
                          <span className="opacity-50 block mb-1">Tentadas</span>
                          <span>{bucket.attemptedSkills}</span>
                        </div>
                        <div className="brutal-border bg-white px-3 py-2">
                          <span className="opacity-50 block mb-1">Intocadas</span>
                          <span>{bucket.untouchedSkills}</span>
                        </div>
                        <div className="brutal-border bg-white px-3 py-2">
                          <span className="opacity-50 block mb-1">Cobertura</span>
                          <span>{debtPercent}% em risco</span>
                        </div>
                      </div>

                      <div className="mt-4 h-4 brutal-border bg-white overflow-hidden">
                        <div className="h-full bg-brand border-r-2 border-dark" style={{ width: `${bucket.masteryPercent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="brutal-border p-5 bg-stone-50">
                <p className="font-bold uppercase text-sm">Sem dívida ativa agora.</p>
                <p className="text-sm font-medium mt-2">
                  Continue praticando para o ledger identificar os blocos que já passaram no corte e os que ainda
                  precisam de reforço.
                </p>
              </div>
            )}
          </div>

          <div className="brutal-border p-8 bg-white">
            <h3 className="font-display text-2xl uppercase mb-8 flex items-center gap-2">
              <Medal size={24} />
              Medalhas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {BADGES.map((badge) => {
                const isEarned = progress.badges.includes(badge.id);
                const Icon = resolveLucideIcon(badge.icon, Medal);

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
          <div className="sticky top-24 space-y-8">
            <div className="brutal-border p-8 bg-white">
              <h3 className="font-display text-2xl uppercase mb-8 flex items-center gap-2">
                <RefreshCcw size={24} />
                Recuperação
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs font-bold uppercase">
                <div className="brutal-border bg-brand/10 px-3 py-3">
                  <span className="block opacity-50 mb-1">Pendentes</span>
                  <span>{recoveryOverview.pendingAssignments}</span>
                </div>
                <div className="brutal-border bg-white px-3 py-3">
                  <span className="block opacity-50 mb-1">Em revisão</span>
                  <span>{recoveryOverview.reviewAssignments}</span>
                </div>
                <div className="brutal-border bg-white px-3 py-3 col-span-2">
                  <span className="block opacity-50 mb-1">Aguardando reteste</span>
                  <span>{recoveryOverview.retryAssignments}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-dark border-dashed">
                <p className="text-[10px] font-bold uppercase opacity-50 mb-4">Próxima ação</p>
                {recoveryOverview.nextActionLessonTitle ? (
                  <div className="brutal-border bg-stone-50 px-4 py-4">
                    <p className="text-xs font-bold uppercase">{recoveryOverview.nextActionLessonTitle}</p>
                    <p className="mt-2 text-sm font-medium">{recoveryOverview.nextActionSummary}</p>
                  </div>
                ) : (
                  <p className="text-sm font-medium">Nenhuma recuperação ativa no momento.</p>
                )}
              </div>
            </div>

            <div className="brutal-border p-8 bg-white">
              <h3 className="font-display text-2xl uppercase mb-8 flex items-center gap-2">
                <Activity size={24} />
                Telemetria Local
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs font-bold uppercase">
                <div className="brutal-border bg-brand/10 px-3 py-3">
                  <span className="block opacity-50 mb-1">Envios</span>
                  <span>{analyticsSummary.exerciseSubmittedCount}</span>
                </div>
                <div className="brutal-border bg-white px-3 py-3">
                  <span className="block opacity-50 mb-1">Aprovação</span>
                  <span>{analyticsSummary.approvalRate}%</span>
                </div>
                <div className="brutal-border bg-white px-3 py-3">
                  <span className="block opacity-50 mb-1">Bloqueios</span>
                  <span>{analyticsSummary.lessonBlockedCount}</span>
                </div>
                <div className="brutal-border bg-white px-3 py-3">
                  <span className="block opacity-50 mb-1">Aulas iniciadas</span>
                  <span>{analyticsSummary.lessonStartedCount}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-dark border-dashed">
                <p className="text-[10px] font-bold uppercase opacity-50 mb-4">Eventos recentes</p>
                <div className="space-y-3">
                  {analyticsSummary.recentEvents.length > 0 ? (
                    analyticsSummary.recentEvents.map((event) => (
                      <div key={event.id} className="brutal-border bg-stone-50 px-3 py-3">
                        <p className="text-[10px] font-bold uppercase opacity-50">{event.type}</p>
                        <p className="mt-1 text-xs font-medium">
                          {event.percentage != null ? `${event.percentage}%` : 'Sem percentual'}{' '}
                          {event.lessonId ? `· ${event.lessonId}` : ''}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm font-medium">Os eventos locais vão aparecer aqui conforme o aluno usa o app.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="brutal-border p-8 bg-white">
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
    </div>
  );
};
