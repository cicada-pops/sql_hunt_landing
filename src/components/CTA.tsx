import { Search, Terminal, Shield } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gray-900 p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.08)_0%,_transparent_70%)]" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Terminal className="w-8 h-8 text-amber-400" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Готовы к первому делу?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Первые два дела открыты бесплатно — без ввода карты и ожидания. Начните прямо сейчас.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold px-10 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-amber-500/25 text-lg"
              >
                <Search className="w-5 h-5" />
                Открыть первое дело
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-600">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Безопасная песочница
              </span>
              <span>Работает в браузере</span>
              <span>Без установки</span>
            </div>

            <p className="mt-4 text-xs text-gray-700">
              Разработано при поддержке гранта Фонда содействия инновациям, программа «Студенческий стартап»
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
