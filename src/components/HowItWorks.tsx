import { FolderOpen, Database, Terminal, CheckCircle } from 'lucide-react';

const STEPS = [
  {
    icon: FolderOpen,
    num: '01',
    title: 'Откройте дело',
    desc: 'Читайте обстоятельства преступления, изучайте материалы следствия и формулируйте вопрос, на который нужно найти ответ.',
  },
  {
    icon: Database,
    num: '02',
    title: 'Изучите схему базы',
    desc: 'Перед вами — визуализатор архива расследования. Таблицы, связи, описания колонок на русском языке прямо рядом с редактором.',
  },
  {
    icon: Terminal,
    num: '03',
    title: 'Напишите запрос',
    desc: 'Никаких вариантов для выбора. Пишите SQL: JOIN-ите таблицы, фильтруйте, группируйте, выявляйте противоречия. Ответ в данных.',
  },
  {
    icon: CheckCircle,
    num: '04',
    title: 'Раскройте тайну',
    desc: 'Правильный запрос — дело закрыто. Получайте опыт, открывайте следующие расследования — сложнее, запутаннее, интереснее.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-28 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Механика игры</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Как работает расследование</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Никаких вариантов для выбора. Только вы, SQL и база данных, полная противоречий.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all group"
            >
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 border-t border-dashed border-gray-700 z-10" />
              )}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <step.icon className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-4xl font-black text-gray-800 leading-none">{step.num}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="ml-2 text-sm text-gray-500 font-mono">Дело №2 — «Последняя встреча»</span>
            <span className="ml-auto text-xs text-amber-400/60 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
              требует 100 XP
            </span>
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-800">
            <div className="p-6">
              <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest mb-3">Обстоятельства</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                3 мая 2023 года банкир Игорь Седов найден мёртвым. Накануне он встречался с неизвестным в кафе,
                и между ними вспыхнула ссора. Свидетель заметил у собеседника кожаный портфель
                с выгравированным названием адвокатской фирмы.
              </p>
              <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <p className="text-xs text-amber-300 font-mono">
                  <span className="text-gray-500">Задача: </span>
                  Найдите адвоката без подтверждённого алиби, обвинявшегося в мошенничестве и до сих пор на свободе.
                </p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs text-green-400 font-semibold uppercase tracking-widest mb-3">SQL-запрос следователя</p>
              <pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">{`SELECT p.name, p.occupation
FROM people p
JOIN suspects  s ON s.person_id = p.id
JOIN charges   c ON c.suspect_id = s.id
JOIN alibis    a ON a.person_id  = p.id
WHERE p.occupation = 'адвокат'
  AND c.article LIKE '%мошенничество%'
  AND s.status  = 'на свободе'
  AND a.status != 'confirmed';`}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
