import { useState } from 'react';
import { Users, Briefcase, UserCheck, Scale, Shield, MessageSquare, MapPin, Search, Link, LayoutGrid, List } from 'lucide-react';

const TABLES = [
  {
    icon: Users,
    name: 'people',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    desc: 'Фигуранты расследований',
    columns: [
      { name: 'id', type: 'uuid', pk: true, desc: 'Уникальный идентификатор персоны' },
      { name: 'first_name', type: 'text', desc: 'Имя' },
      { name: 'last_name', type: 'text', desc: 'Фамилия' },
      { name: 'age', type: 'int', desc: 'Возраст' },
      { name: 'occupation', type: 'text', desc: 'Профессия или род деятельности' },
      { name: 'appearance', type: 'text', desc: 'Описание внешности' },
      { name: 'habits', type: 'text', desc: 'Привычки и особые приметы' },
    ],
  },
  {
    icon: Briefcase,
    name: 'cases',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    desc: 'Уголовные дела',
    columns: [
      { name: 'id', type: 'uuid', pk: true, desc: 'Уникальный идентификатор дела' },
      { name: 'title', type: 'text', desc: 'Название дела' },
      { name: 'type', type: 'text', desc: 'Тип преступления (кража, убийство и т.д.)' },
      { name: 'status', type: 'text', desc: 'Статус дела: открыто, закрыто, приостановлено' },
      { name: 'opened_at', type: 'date', desc: 'Дата открытия уголовного дела' },
      { name: 'closed_at', type: 'date', desc: 'Дата закрытия (если закрыто)' },
      { name: 'description', type: 'text', desc: 'Описание дела и его обстоятельств' },
    ],
  },
  {
    icon: UserCheck,
    name: 'suspects',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    desc: 'Фигуранты дела',
    columns: [
      { name: 'id', type: 'uuid', pk: true, desc: 'Идентификатор записи' },
      { name: 'case_id', type: 'uuid', fk: true, desc: 'Ссылка на дело' },
      { name: 'person_id', type: 'uuid', fk: true, desc: 'Ссылка на персону' },
      { name: 'role', type: 'text', desc: 'Роль в деле: подозреваемый, свидетель, жертва' },
      { name: 'status', type: 'text', desc: 'Статус подозреваемого в рамках дела' },
      { name: 'added_at', type: 'date', desc: 'Дата добавления в дело' },
    ],
  },
  {
    icon: Scale,
    name: 'charges',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    desc: 'Обвинения и приговоры',
    columns: [
      { name: 'id', type: 'uuid', pk: true, desc: 'Идентификатор обвинения' },
      { name: 'suspect_id', type: 'uuid', fk: true, desc: 'Ссылка на фигуранта' },
      { name: 'article', type: 'text', desc: 'Статья закона' },
      { name: 'verdict', type: 'text', desc: 'Решение суда' },
      { name: 'sentence', type: 'text', desc: 'Назначенное наказание' },
      { name: 'date', type: 'date', desc: 'Дата вынесения решения' },
    ],
  },
  {
    icon: Shield,
    name: 'alibis',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    desc: 'Алиби фигурантов',
    columns: [
      { name: 'id', type: 'uuid', pk: true, desc: 'Идентификатор алиби' },
      { name: 'person_id', type: 'uuid', fk: true, desc: 'Ссылка на персону' },
      { name: 'case_id', type: 'uuid', fk: true, desc: 'Ссылка на дело' },
      { name: 'description', type: 'text', desc: 'Описание алиби' },
      { name: 'status', type: 'text', desc: 'confirmed / unconfirmed / suspicious' },
      { name: 'confirmed_by', type: 'text', desc: 'Кем подтверждено (если подтверждено)' },
    ],
  },
  {
    icon: MessageSquare,
    name: 'testimonies',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    desc: 'Свидетельские показания',
    columns: [
      { name: 'id', type: 'uuid', pk: true, desc: 'Идентификатор показания' },
      { name: 'case_id', type: 'uuid', fk: true, desc: 'Ссылка на дело' },
      { name: 'witness_id', type: 'uuid', fk: true, desc: 'Свидетель (ссылка на people)' },
      { name: 'subject_id', type: 'uuid', fk: true, desc: 'О ком показание (ссылка на people)' },
      { name: 'content', type: 'text', desc: 'Текст показания' },
      { name: 'date', type: 'date', desc: 'Дата дачи показаний' },
      { name: 'contradiction', type: 'bool', desc: 'Содержит ли противоречие с другими показаниями' },
    ],
  },
  {
    icon: MapPin,
    name: 'locations',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    desc: 'Места событий',
    columns: [
      { name: 'id', type: 'uuid', pk: true, desc: 'Идентификатор места' },
      { name: 'case_id', type: 'uuid', fk: true, desc: 'Ссылка на дело' },
      { name: 'address', type: 'text', desc: 'Адрес места события' },
      { name: 'event_type', type: 'text', desc: 'Тип события на месте' },
      { name: 'event_date', type: 'date', desc: 'Дата события' },
      { name: 'description', type: 'text', desc: 'Описание места и обстоятельств' },
    ],
  },
  {
    icon: Search,
    name: 'clues',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    desc: 'Улики и зацепки',
    columns: [
      { name: 'id', type: 'uuid', pk: true, desc: 'Идентификатор улики' },
      { name: 'case_id', type: 'uuid', fk: true, desc: 'Ссылка на дело' },
      { name: 'type', type: 'text', desc: 'Тип: физическая, цифровая, документальная, аудио/видео' },
      { name: 'description', type: 'text', desc: 'Описание улики' },
      { name: 'found_at', type: 'date', desc: 'Дата обнаружения' },
      { name: 'location_id', type: 'uuid', fk: true, desc: 'Место обнаружения' },
      { name: 'relevance', type: 'text', desc: 'Степень значимости для дела' },
    ],
  },
];

export default function DatabaseSchema() {
  const [active, setActive] = useState<string | null>('cases');
  const [viewMode, setViewMode] = useState<'table' | 'er'>('table');

  const activeTable = TABLES.find(t => t.name === active);

  return (
    <section id="schema" className="py-28 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Схема базы данных</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Архив расследования</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            10 взаимосвязанных таблиц. Каждая колонка снабжена описанием на русском языке — как в
            настоящем детективном архиве. Переключайтесь между табличным видом и ER-диаграммой прямо
            в интерфейсе, рядом с редактором запросов.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {TABLES.map(table => (
              <button
                key={table.name}
                onClick={() => setActive(active === table.name ? null : table.name)}
                className={`flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  active === table.name
                    ? `${table.bg} ${table.border} ${table.color}`
                    : 'bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'
                }`}
              >
                <table.icon className="w-3 h-3" />
                {table.name}
              </button>
            ))}
          </div>
          <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-1 gap-1">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all ${viewMode === 'table' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <List className="w-3.5 h-3.5" />
              Таблица
            </button>
            <button
              onClick={() => setViewMode('er')}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all ${viewMode === 'er' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              ER-диаграмма
            </button>
          </div>
        </div>

        {activeTable && viewMode === 'table' && (
          <div className={`bg-gray-900 border ${activeTable.border} rounded-2xl overflow-hidden`}>
            <div className={`px-6 py-4 border-b ${activeTable.border} flex items-center gap-3`}>
              <div className={`w-7 h-7 rounded-lg ${activeTable.bg} border ${activeTable.border} flex items-center justify-center`}>
                <activeTable.icon className={`w-3.5 h-3.5 ${activeTable.color}`} />
              </div>
              <code className={`font-mono font-bold ${activeTable.color}`}>{activeTable.name}</code>
              <span className="text-gray-500 text-sm">— {activeTable.desc}</span>
            </div>
            <div className="divide-y divide-gray-800/60">
              {activeTable.columns.map(col => (
                <div key={col.name} className="px-6 py-3 flex items-center gap-4">
                  <div className="flex items-center gap-2 w-40 flex-shrink-0">
                    <code className={`font-mono text-sm font-medium ${activeTable.color}`}>{col.name}</code>
                    {col.pk && (
                      <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-1.5 py-0.5 rounded">PK</span>
                    )}
                    {col.fk && (
                      <Link className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                  <code className="font-mono text-xs text-gray-600 w-20 flex-shrink-0">{col.type}</code>
                  <span className="text-sm text-gray-400">{col.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'er' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 min-h-64 flex flex-col">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-6">ER-диаграмма — ключевые связи</p>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              {TABLES.map(t => (
                <div
                  key={t.name}
                  className={`rounded-xl border ${t.border} ${t.bg} p-4 cursor-pointer transition-all hover:scale-105`}
                  onClick={() => { setViewMode('table'); setActive(t.name); }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <t.icon className={`w-4 h-4 ${t.color}`} />
                    <code className={`font-mono text-xs font-bold ${t.color}`}>{t.name}</code>
                  </div>
                  <div className="space-y-1">
                    {t.columns.filter(c => c.pk || c.fk).map(c => (
                      <div key={c.name} className="flex items-center gap-1.5 text-xs">
                        {c.pk && <span className="text-yellow-400 font-bold text-[10px]">PK</span>}
                        {c.fk && <Link className="w-2.5 h-2.5 text-gray-500" />}
                        <span className="text-gray-400 font-mono">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-600 text-center">
              Нажмите на таблицу, чтобы открыть подробный вид
            </p>
          </div>
        )}

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {
              title: 'Описания на русском',
              desc: 'Каждая колонка — не «technology», а «Профессия или род деятельности». Студент понимает сюжет, а не читает технический срез.',
              color: 'border-amber-500/20',
            },
            {
              title: 'Кеш на 24 часа',
              desc: 'Схема кешируется в браузере — при повторных открытиях подгружается мгновенно, без задержек и лишних запросов к серверу.',
              color: 'border-gray-700',
            },
            {
              title: 'Мини-схема рядом с редактором',
              desc: 'Компактная боковая панель прямо у поля ввода: не нужно переключать вкладки, чтобы вспомнить точное имя поля.',
              color: 'border-gray-700',
            },
          ].map(item => (
            <div key={item.title} className={`bg-gray-900 border ${item.color} rounded-xl p-5`}>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
