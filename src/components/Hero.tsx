import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SQL_LINES = [
  "SELECT p.name FROM people p JOIN alibis a ON p.id = a.person_id WHERE a.status = 'unconfirmed';",
  'SELECT clue_type, COUNT(*) FROM clues WHERE case_id = 1 GROUP BY clue_type ORDER BY 2 DESC;',
  'WITH chain AS (SELECT * FROM suspects WHERE case_id = 5) SELECT ... UNION SELECT ...;',
  'SELECT w.name, COUNT(t.case_id) OVER (PARTITION BY w.id) FROM testimonies t JOIN people w ON t.witness_id = w.id;',
];

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = SQL_LINES[lineIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(i => i + 1), 36);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(i => i - 1), 16);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setLineIdx(i => (i + 1) % SQL_LINES.length);
    }

    setTyped(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, lineIdx]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.07)_0%,_transparent_65%)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #d97706 0px, #d97706 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, #d97706 0px, #d97706 1px, transparent 1px, transparent 48px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium px-4 py-2 rounded-full tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            Детективный SQL-тренажёр
          </div>
          <div className="inline-flex items-center gap-2 bg-gray-800/60 border border-gray-700/40 text-gray-400 text-xs font-medium px-4 py-2 rounded-full">
            При поддержке Фонда содействия инновациям
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
          Учи SQL через<br />
          <span className="text-amber-400">детективные дела</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Вы — следователь. База данных полицейского архива перед вами.
          Изучайте улики, допрашивайте свидетелей, выявляйте противоречия в алиби — всё через SQL-запросы.
        </p>

        <div className="bg-gray-900 border border-gray-700/60 rounded-xl p-5 max-w-2xl mx-auto mb-10 text-left shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-gray-500 font-mono">investigation.sql</span>
          </div>
          <div className="font-mono text-sm text-green-400 min-h-[24px]">
            <span className="text-gray-500">{'> '}</span>
            {typed}
            <span className="animate-pulse text-amber-400">|</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a
            href="#pricing"
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-amber-500/20"
          >
            <Search className="w-5 h-5" />
            Открыть первое дело
          </a>
          <a
            href="#cases"
            className="flex items-center justify-center gap-2 border border-gray-700 hover:border-amber-500/50 text-gray-300 hover:text-amber-400 font-semibold px-8 py-4 rounded-xl transition-all"
          >
            Смотреть дела
          </a>
        </div>

        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 font-mono">
          sqlhunt.com
        </span>

        <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { val: '5', label: 'Сюжетных дел' },
            { val: '10', label: 'Таблиц в архиве' },
            { val: '4', label: 'Тарифа' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-amber-400">{stat.val}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a href="#cases" className="absolute bottom-8 animate-bounce text-gray-600 hover:text-amber-400 transition-colors">
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
