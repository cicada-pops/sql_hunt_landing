import { Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/60 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-gray-950" />
            </div>
            <span className="font-bold tracking-tight">
              SQL<span className="text-amber-400">Hunt</span>
            </span>
          </div>
          <p className="text-xs text-gray-600">Детективный SQL-тренажёр</p>
          <p className="text-xs text-gray-700 max-w-xs text-center md:text-left">
            При поддержке гранта Фонда содействия инновациям, программа «Студенческий стартап»
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <a href="#how" className="hover:text-gray-400 transition-colors">Как играть</a>
          <a href="#cases" className="hover:text-gray-400 transition-colors">Дела</a>
          <a href="#schema" className="hover:text-gray-400 transition-colors">Схема БД</a>
          <a href="#pricing" className="hover:text-gray-400 transition-colors">Тарифы</a>
        </div>

        <span className="flex items-center gap-1.5 text-sm text-gray-500 font-mono">
          sqlhunt.com
        </span>
      </div>
    </footer>
  );
}
