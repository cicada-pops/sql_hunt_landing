export default function GrantBanner() {
  return (
    <section className="py-12 px-6 border-t border-gray-800/60">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-8">
        <div className="flex items-center gap-6 flex-shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}head_logo_fasie.png`}
            alt="Фонд содействия инновациям"
            className="h-20 w-auto opacity-90"
          />
          <img
            src={`${import.meta.env.BASE_URL}header-logo__1.svg`}
            alt="Логотип"
            className="h-20 w-auto opacity-90"
          />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed text-center sm:text-left">
          Проект реализован при поддержке Фонда содействия инновациям в рамках программы «Студенческий стартап» мероприятия «Платформа университетского технологического предпринимательства» федерального проекта «Технологии»
        </p>
      </div>
    </section>
  );
}
