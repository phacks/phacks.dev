import { CalendaronsLayout } from '@/components/calendarons/Layout'
import { CalendaronsContact } from '@/components/calendarons/Contact'
import help from '@/content/calendarons-help.json'

export default function CalendaronsSupport() {
  return (
    <CalendaronsLayout
      title="Calendarons — Aide et contact"
      description="Les réponses à vos questions sur Calendarons : iCloud, partage à deux, notifications, sauvegardes et contacts."
    >
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Aide et contact
        </h1>
        <p className="mt-6 mb-10 text-base text-zinc-600 dark:text-zinc-400">
          Une question sur Calendarons ? Retrouvez les réponses ci-dessous.
        </p>
        {help.articles.map((article) => (
          <details
            id={article.id}
            key={article.id}
            className="group border-t border-zinc-100 py-5 dark:border-zinc-800"
          >
            <summary className="cursor-pointer text-base font-semibold text-zinc-800 dark:text-zinc-100">
              {article.title}
            </summary>
            <div className="mt-5 space-y-4 text-base text-zinc-600 dark:text-zinc-400">
              {article.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
        <CalendaronsContact />
      </div>
    </CalendaronsLayout>
  )
}
