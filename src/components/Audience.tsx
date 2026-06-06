import { BookOpen, Cpu, Glasses } from 'lucide-react';

const GROUPS = [
  {
    icon: BookOpen,
    title: 'Изучаю SQL',
    tags: ['Новичок', 'Обучение'],
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    desc: 'Устали учить SQL на абстрактных таблицах employees и orders? Здесь те же JOIN-ы и GROUP BY, но в роли детектива с реальной историей. Каждый запрос — шаг к разгадке.',
    list: [
      'Реальная мотивация вместо скучных упражнений',
      'Постепенное усложнение: от SELECT до рекурсивных CTE',
      'Неправильные ответы не штрафуются — экспериментируйте',
    ],
  },
  {
    icon: Cpu,
    title: 'Знаю SQL хорошо',
    tags: ['Опытный', 'Практика'],
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    desc: 'Сложные дела — многотабличные запросы с оконными функциями, рекурсивными CTE и логическими противоречиями в данных. Хороший способ размять голову без лишней теории.',
    list: [
      'Оконные функции, UNION/INTERSECT, рекурсия',
      'Поиск противоречий и обход графов связей',
      'Нет единственно верного запроса — важен результат',
    ],
  },
  {
    icon: Glasses,
    title: 'Люблю детективы',
    tags: ['Сюжет', 'Загадки'],
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    desc: 'Вам нравится докопаться до правды самому. SQL Hunt — настоящие расследования: атмосферные описания, улики, показания свидетелей, и ответ не написан заранее — его нужно вычислить.',
    list: [
      'Живые истории с характерами и мотивами',
      'Вы сами строите логику и находите улики',
      'Каждое дело — завершённая детективная история',
    ],
  },
];

export default function Audience() {
  return (
    <section id="audience" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Для кого</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Кому подойдёт SQL Hunt</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Три разных пути — один и тот же азарт расследования.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {GROUPS.map(g => (
            <div
              key={g.title}
              className={`bg-gray-900 border ${g.border} rounded-2xl p-7 flex flex-col hover:scale-[1.01] transition-transform`}
            >
              <div className={`w-12 h-12 rounded-xl ${g.bg} border ${g.border} flex items-center justify-center mb-5`}>
                <g.icon className={`w-6 h-6 ${g.color}`} />
              </div>

              <div className="flex items-center gap-2 flex-wrap mb-3">
                <h3 className="font-bold text-xl">{g.title}</h3>
                {g.tags.map(tag => (
                  <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded border ${g.bg} ${g.color} ${g.border}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">{g.desc}</p>

              <ul className="space-y-2 mt-auto">
                {g.list.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${g.color.replace('text-', 'bg-')}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
