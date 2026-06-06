import { Check, Zap, Users, Tag } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: '0 ₽',
    period: 'навсегда',
    highlight: false,
    badge: null,
    features: [
      'Первые два дела сценария',
      'Редактор SQL-запросов',
      'Схема базы данных',
      'Неограниченное число попыток',
      'Прогресс сохраняется',
    ],
    missing: [
      'Дела 3–5 (средний–эксперт)',
      'Повышенное начисление XP',
      'Облачные заметки',
      'Приоритетная поддержка',
    ],
    cta: 'Начать бесплатно',
    ctaStyle: 'border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white',
  },
  {
    name: 'Pro',
    price: '490 ₽',
    altPrice: '325 ₽/мес при оплате за год (3 900 ₽)',
    period: 'в месяц',
    highlight: true,
    badge: 'Популярный',
    features: [
      'Все 5 дел сценария',
      'Редактор SQL-запросов',
      'Схема базы данных',
      'Неограниченное число попыток',
      'Начисление XP +30%',
      'Облачные заметки',
      'Приоритетная поддержка',
    ],
    missing: [],
    cta: 'Оформить Pro',
    ctaStyle: 'bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold shadow-lg shadow-amber-500/20',
  },
  {
    name: 'Team',
    price: '2 900 ₽',
    period: 'в месяц / 20 мест',
    highlight: false,
    badge: 'Для преподавателей',
    features: [
      'Всё из Pro для каждого студента',
      'Дашборд прогресса группы',
      'Создание собственных дел',
      'Экспорт отчётов по студентам',
      'До 20 студенческих мест',
      'Партнёрские промокоды',
    ],
    missing: [],
    cta: 'Связаться с командой',
    ctaStyle: 'border border-gray-700 hover:border-amber-500/50 text-gray-300 hover:text-amber-400',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Тарифы</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Начните бесплатно</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Базовая часть платформы бесплатна. Подписка открывает все дела и расширяет возможности
            для тех, кто идёт по полному курсу.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-7 flex flex-col transition-all ${
                plan.highlight
                  ? 'bg-gray-900 border-amber-500/40 ring-1 ring-amber-500/20'
                  : 'bg-gray-900 border-gray-800'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap ${
                  plan.highlight
                    ? 'bg-amber-500 text-gray-950 border-amber-400'
                    : 'bg-gray-800 text-gray-400 border-gray-700'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-black text-xl mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-black ${plan.highlight ? 'text-amber-400' : ''}`}>{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                {plan.altPrice && (
                  <p className="text-xs text-gray-500 mt-1.5">{plan.altPrice}</p>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
                {plan.missing.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
                      <span className="w-3 h-px bg-gray-700 block" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`w-full text-center px-6 py-3 rounded-xl transition-all text-sm font-semibold ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Tag,
              title: 'Промокоды',
              desc: 'STUDENT25 — скидка 25% для студентов при подтверждении студенческого билета. Партнёрские промокоды от онлайн-школ.',
            },
            {
              icon: Zap,
              title: 'Автопродление',
              desc: 'Подписка продлевается автоматически. При сбое оплаты — 3-дневный льготный период с доступом и мягким уведомлением.',
            },
            {
              icon: Users,
              title: 'Провайдеры',
              desc: 'ЮKassa для российских пользователей (МИР, СБП, SberPay), Stripe — для международных карт.',
            },
          ].map(item => (
            <div key={item.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-amber-400" />
                <h4 className="font-semibold text-sm">{item.title}</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
