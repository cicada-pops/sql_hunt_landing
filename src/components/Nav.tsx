import { Terminal } from 'lucide-react';

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-amber-900/30 bg-gray-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
            <Terminal className="w-4 h-4 text-gray-950" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            SQL<span className="text-amber-400">Hunt</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#how" className="hover:text-amber-400 transition-colors">Как играть</a>
          <a href="#cases" className="hover:text-amber-400 transition-colors">Дела</a>
          <a href="#schema" className="hover:text-amber-400 transition-colors">База данных</a>
          <a href="#pricing" className="hover:text-amber-400 transition-colors">Тарифы</a>
        </div>
      </div>
    </nav>
  );
}
