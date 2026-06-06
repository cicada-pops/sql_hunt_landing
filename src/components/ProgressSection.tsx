import { Trophy, Zap, RotateCcw, Lock } from 'lucide-react';

const STATES = [
  {
    label: 'Не начато',
    color: 'text-gray-400',
    bg: 'bg-gray-800',
    border: 'border-gray-700',
    dot: 'bg-gray-600',
    desc: 'Пользователь ещё не открывал дело. Дело отображается обычно или затенённым, если недостаточно опыта.',
  },
  {
    label: 'В процессе',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400 animate-pulse',
    desc: 'Хотя бы один запрос отправлен, но правильного ответа ещё нет. Переходит автоматически при первой попытке.',
  },
  {
    label: 'Завершено',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    dot: 'bg-green-400',
    desc: 'Студент решил дело. Карточка помечается крестом, опыт зачислен. Вернуться и перечитать дело можно всегда.',
  },
];

const CASES_DEMO = [
  { num: '01', title: 'Серебряный Ключ', xp: 100, state: 'done' },
  { num: '02', title: 'Последняя встреча', xp: 100, state: 'done' },
  { num: '03', title: 'Архивные закономерности', xp: 100, state: 'active' },
  { num: '04', title: 'Молчаливый свидетель', xp: 150, state: 'locked' },
  { num: '05', title: 'Тень империи', xp: 200, state: 'locked' },
];

export default function ProgressSection() {
  const earnedXP = 200;
  const totalXP = 650;
  const nextUnlock = 250;

  return (
    <section id="progress" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Система прогресса</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Понятная траектория<br />без лишних наград</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Никаких «деревьев навыков» и ачивок ради ачивок. Только опыт, статус дел и открывающиеся расследования.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-12">
          <div className="lg:col-span-3 space-y-3">
            {CASES_DEMO.map(c => (
              <div
                key={c.num}
                className={`relative flex items-center gap-4 px-5 py-4 rounded-xl border transition-all ${
                  c.state === 'done'
                    ? 'bg-gray-900 border-gray-700'
                    : c.state === 'active'
                    ? 'bg-amber-500/5 border-amber-500/30'
                    : 'bg-gray-900/50 border-gray-800/50 opacity-60'
                }`}
              >
                {c.state === 'done' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-px bg-gray-700/60 rotate-[-1.5deg]" />
                  </div>
                )}
                <span className="font-mono text-sm font-bold text-gray-600 w-6 flex-shrink-0">{c.num}</span>
                <div className="flex-1 min-w-0">
                  <span className={`font-medium text-sm ${c.state === 'locked' ? 'text-gray-600' : c.state === 'done' ? 'text-gray-500 line-through' : ''}`}>
                    «{c.title}»
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {c.state !== 'locked' && (
                    <span className={`flex items-center gap-1 text-xs font-semibold ${c.state === 'done' ? 'text-gray-600' : 'text-amber-400'}`}>
                      <Zap className="w-3 h-3" />+{c.xp} XP
                    </span>
                  )}
                  {c.state === 'locked' && <Lock className="w-3.5 h-3.5 text-gray-700" />}
                  {c.state === 'active' && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                  {c.state === 'done' && (
                    <span className="text-green-500 text-xs font-medium">Раскрыто</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-gray-950" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Профиль следователя</div>
                    <div className="text-xs text-gray-500">{earnedXP} / {nextUnlock} XP до следующего</div>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all"
                  style={{ width: `${(earnedXP / nextUnlock) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>{earnedXP} XP</span>
                <span>{nextUnlock} XP</span>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Как начисляется опыт</p>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Опыт начисляется один раз за первое правильное решение — повторные попытки XP не дают.</span>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Неправильные ответы не штрафуются. Экспериментируйте свободно — это учебная среда.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span>Доступ к материалам дела защищён сервером — нельзя «подсмотреть» заблокированные задания через API.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {STATES.map(s => (
            <div key={s.label} className={`bg-gray-900 border ${s.border} rounded-xl p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                <span className={`font-semibold text-sm ${s.color}`}>{s.label}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
