import { useState } from 'react';
import { Lock, ChevronDown, ChevronUp, Zap } from 'lucide-react';

const CASES = [
  {
    num: '01',
    title: 'Серебряный Ключ',
    type: 'Пропажа',
    year: '2004',
    xpRequired: 0,
    xpReward: 100,
    difficulty: 1,
    diffLabel: 'Начальный',
    locked: false,
    skills: ['SELECT / WHERE', 'Простые JOIN', 'LIKE / фильтры по тексту'],
    summary: '2004 год, окраина города. В мотеле «Серебряный Ключ» планировалась тайная встреча контрабандистов, но один из ключевых участников исчез. Работник заправки видел мужчину с рыжими волосами, в чёрной одежде с «морской» татуировкой.',
    task: 'Найдите человека, который фигурирует в улике (диктофонная запись) и одновременно подходит под описание свидетеля. Подвох: настоящий преступник может не быть в списке официальных подозреваемых.',
  },
  {
    num: '02',
    title: 'Последняя встреча',
    type: 'Убийство',
    year: '2023',
    xpRequired: 100,
    xpReward: 100,
    difficulty: 2,
    diffLabel: 'Базовый',
    locked: false,
    skills: ['Многотабличные JOIN', 'Комбинация условий', 'Статусы алиби и обвинений'],
    summary: '3 мая 2023 года банкир Игорь Седов найден мёртвым в своей квартире. Следствие установило: за два дня до смерти он встречался с неизвестным в кафе «Грин Плейс», и между ними вспыхнула ссора.',
    task: 'Найдите адвоката, который обвинялся в мошенничестве, до сих пор на свободе и не имеет подтверждённого алиби — четыре условия одновременно, четыре разные таблицы.',
  },
  {
    num: '03',
    title: 'Архивные закономерности',
    type: 'Аналитика',
    year: 'Архив',
    xpRequired: 150,
    xpReward: 100,
    difficulty: 3,
    diffLabel: 'Средний',
    locked: false,
    skills: ['Агрегация / COUNT', 'GROUP BY / ORDER BY', 'LEFT JOIN, фильтрация по датам'],
    summary: 'Следователя переводят в архив. Нужно определить, сколько уголовных дел связано с каждым человеком за период 2010–2020. Задание специально устроено так, что «очевидное» решение даёт неверный ответ.',
    task: 'Найдите человека с максимальным числом дел за 2010–2020. Правильный результат требует внешнего соединения и аккуратной расстановки условий — классическая ошибка новичка здесь встроена намеренно.',
  },
  {
    num: '04',
    title: 'Молчаливый свидетель',
    type: 'Серия краж',
    year: '2019–2021',
    xpRequired: 250,
    xpReward: 150,
    difficulty: 4,
    diffLabel: 'Продвинутый',
    locked: true,
    skills: ['Оконные функции', 'WITH (CTE)', 'Подзапросы, работа с датами'],
    summary: 'В деле о серии краж на складах один из свидетелей давал показания сразу по нескольким эпизодам — и каждый раз его рассказ менялся. Более того, одно из показаний датировано позже даты закрытия дела.',
    task: 'Выявите свидетеля с максимальным числом показаний по делам одного типа, у которого хотя бы одно показание датировано позже закрытия дела — физически он не мог быть свидетелем.',
  },
  {
    num: '05',
    title: 'Тень империи',
    type: 'Организованная группа',
    year: '2015–2023',
    xpRequired: 400,
    xpReward: 200,
    difficulty: 5,
    diffLabel: 'Эксперт',
    locked: true,
    skills: ['Рекурсивные CTE', 'UNION / INTERSECT / EXCEPT', 'Обход графов связей'],
    summary: 'Следствие подозревает: за серией разнотипных преступлений (мошенничество, взяточничество, киберпреступность) стоит одна координационная группа. Нужно восстановить «тень» организации.',
    task: 'Найдите человека, чьи алиби пересекаются по времени (он не мог быть в двух местах сразу), и чьи соучастники образуют наибольший связный компонент — рекурсивно обойдите граф связей подозреваемых.',
  },
];

const DIFF_COLORS: Record<number, string> = {
  1: 'text-green-400 bg-green-500/10 border-green-500/20',
  2: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  3: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  4: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  5: 'text-red-400 bg-red-500/10 border-red-500/20',
};

export default function Cases() {
  const [expanded, setExpanded] = useState<string | null>('01');

  return (
    <section id="cases" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Сценарий</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">5 дел — от базовых SELECT<br />до рекурсивных запросов</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Каждое дело опирается на навыки предыдущего и добавляет один-два новых приёма.
            Сложные дела разблокируются по мере накопления опыта.
          </p>
        </div>

        <div className="space-y-3">
          {CASES.map(c => {
            const isOpen = expanded === c.num;
            return (
              <div
                key={c.num}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  c.locked
                    ? 'bg-gray-900/50 border-gray-800/50'
                    : isOpen
                    ? 'bg-gray-900 border-amber-500/30'
                    : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                }`}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center gap-5"
                  onClick={() => !c.locked && setExpanded(isOpen ? null : c.num)}
                >
                  <span className={`font-mono text-2xl font-black leading-none flex-shrink-0 ${c.locked ? 'text-gray-700' : 'text-gray-700'}`}>
                    {c.num}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className={`font-bold text-lg ${c.locked ? 'text-gray-600' : ''}`}>
                        «{c.title}»
                      </h3>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${DIFF_COLORS[c.difficulty]}`}>
                        {c.diffLabel}
                      </span>
                      <span className="text-xs text-gray-600 border border-gray-800 px-2.5 py-0.5 rounded-full">
                        {c.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-xs">
                      {c.xpRequired > 0 && (
                        <span className={`${c.locked ? 'text-gray-700' : 'text-gray-500'}`}>
                          Нужно <span className={c.locked ? 'text-gray-600' : 'text-amber-400 font-semibold'}>{c.xpRequired} XP</span>
                        </span>
                      )}
                      {c.xpRequired === 0 && (
                        <span className="text-green-500 font-medium">Открыто сразу</span>
                      )}
                      <span className="flex items-center gap-1 text-gray-500">
                        <Zap className="w-3 h-3" />
                        Награда: <span className={c.locked ? 'text-gray-700' : 'text-amber-400 font-semibold'}>{c.xpReward} XP</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5">
                      {c.skills.slice(0, 2).map(s => (
                        <span key={s} className={`text-xs px-2.5 py-1 rounded-lg font-mono ${c.locked ? 'bg-gray-800/50 text-gray-700' : 'bg-gray-800 text-gray-400'}`}>
                          {s}
                        </span>
                      ))}
                      {c.skills.length > 2 && (
                        <span className="text-xs text-gray-600">+{c.skills.length - 2}</span>
                      )}
                    </div>
                    {c.locked ? (
                      <Lock className="w-4 h-4 text-gray-700 flex-shrink-0" />
                    ) : isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                </button>

                {isOpen && !c.locked && (
                  <div className="border-t border-gray-800 grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                    <div className="md:col-span-3 p-6">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">Обстоятельства</p>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">{c.summary}</p>
                      <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1.5">Задача следователя</p>
                        <p className="text-sm text-amber-200/80 leading-relaxed">{c.task}</p>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-4">Изучаемые навыки</p>
                      <ul className="space-y-2.5">
                        {c.skills.map(skill => (
                          <li key={skill} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                            <span className="font-mono text-sm text-gray-300">{skill}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 pt-5 border-t border-gray-800 flex items-center justify-between text-sm">
                        <span className="text-gray-500">{c.year}</span>
                        <span className="text-gray-500">Тип: <span className="text-gray-300">{c.type}</span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
