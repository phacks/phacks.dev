import { Button } from '@/components/Button'
import help from '@/content/calendarons-help.json'

export function CalendaronsContact() {
  return (
    <section
      id="contact"
      className="mt-12 border-t border-zinc-100 pt-8 dark:border-zinc-800"
    >
      <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        Vous avez besoin d’un coup de main ?
      </h2>
      <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
        Décrivez ce qui se passe et indiquez si vous utilisez Calendarons sur
        iPhone, iPad ou Mac.
      </p>
      {help.publicEmail ? (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Button
            href={`mailto:${help.publicEmail}?subject=Calendarons%20%E2%80%94%20Demande%20d’aide`}
          >
            Écrire à Nicolas
          </Button>
          <a
            className="text-sm text-teal-700 underline underline-offset-4 dark:text-teal-400"
            href={`mailto:${help.publicEmail}`}
          >
            {help.publicEmail}
          </a>
        </div>
      ) : (
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Dans l’app, ouvrez Réglages → Aide et contact → Contacter le
          développeur.
        </p>
      )}
      <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-400">
        Pour un problème technique, vous pouvez joindre les informations
        disponibles dans l’app : Réglages → Aide et contact → Questions
        fréquentes → Informations techniques. Elles ne contiennent ni vos
        évènements ni vos contacts.
      </p>
    </section>
  )
}
