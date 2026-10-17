import Image from 'next/image'
import Link from 'next/link'
import {
  CalendaronsLayout,
  calendaronsPath,
} from '@/components/calendarons/Layout'
import icon from '@/images/projects/calendarons/icon.png'
import mac from '@/images/projects/calendarons/mac.jpg'
import iphone from '@/images/projects/calendarons/iphone.png'

const features = [
  {
    label: 'Au quotidien',
    title: 'Une ligne par jour.',
    text: 'Vos évènements se lisent comme une liste. Ajoutez un dîner, un rendez-vous ou une idée de sortie. Si vos plans changent, glissez l’évènement sur un autre jour.',
  },
  {
    label: 'À deux',
    title: 'Vous choisissez ce que vous partagez.',
    text: 'Vos évènements sont privés au départ. Rendez-les Visibles pour informer votre partenaire, ou Communs pour pouvoir les modifier à deux.',
    modes: ['Privé · pour vous', 'Visible · pour informer', 'Commun · à deux'],
  },
  {
    label: 'Sur vos appareils',
    title: 'Vos journées, à portée de main.',
    text: 'Consultez vos évènements depuis les widgets, retrouvez-les sur votre Mac et ajoutez les anniversaires de vos contacts si vous le souhaitez.',
  },
]

export default function Calendarons() {
  return (
    <CalendaronsLayout
      title="Calendarons"
      description="Un calendrier simple pour iPhone, iPad et Mac. Notez vos évènements et choisissez ce que vous partagez avec votre partenaire."
    >
      <header className="max-w-2xl">
        <div className="flex items-center gap-4 sm:gap-5">
          <Image
            src={icon}
            alt=""
            className="h-16 w-16 flex-none sm:h-20 sm:w-20"
            sizes="80px"
            priority
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              Calendarons
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Pour iPhone, iPad et Mac
            </p>
          </div>
        </div>
        <p className="mt-7 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          <strong className="font-medium text-zinc-800 dark:text-zinc-200">
            Un calendrier simple, pour vous et votre partenaire.
          </strong>
          <br />
          Notez ce que vous avez prévu. Gardez-le pour vous, ou partagez-le à
          deux.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-6">
          <p className="rounded-md bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-100 dark:bg-zinc-700">
            Bientôt sur l’App Store
          </p>
          <Link
            href={`${calendaronsPath}/support`}
            className="text-sm font-medium text-teal-700 hover:text-teal-600 dark:text-teal-400"
          >
            Consulter l’aide →
          </Link>
        </div>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          iOS 27, iPadOS 27 ou macOS 27 minimum.
        </p>
      </header>
      <figure className="mt-12 mb-14">
        <div className="grid grid-cols-1 items-center gap-4 rounded-2xl bg-zinc-100 p-6 sm:grid-cols-[minmax(0,1fr)_30%] sm:gap-8 sm:p-8 lg:px-12 dark:bg-zinc-800/70">
          <Image
            src={mac}
            alt="Calendarons sur Mac : une liste de jours avec les évènements Cycling, Afterwork et Week-end à la mer."
            sizes="(min-width: 1024px) 620px, (min-width: 640px) 55vw, 60vw"
            className="hidden h-auto w-full rounded-lg border border-zinc-200 shadow-lg sm:block dark:border-zinc-600"
            priority
          />
          <Image
            src={iphone}
            alt="Le même calendrier sur iPhone."
            sizes="(min-width: 1024px) 280px, 30vw"
            className="mx-auto h-auto w-full max-w-64 rounded-3xl border-2 border-zinc-300 shadow-lg sm:max-w-none dark:border-zinc-600"
            priority
          />
        </div>
        <figcaption className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Le même calendrier sur iPhone et Mac, synchronisé avec iCloud.
        </figcaption>
      </figure>
      <div className="max-w-3xl">
        {features.map((feature) => (
          <section
            key={feature.label}
            className="grid gap-3 border-t border-zinc-100 py-8 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8 dark:border-zinc-800"
          >
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {feature.label}
            </p>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                {feature.title}
              </h2>
              <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
                {feature.text}
              </p>
              {feature.modes && (
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {feature.modes.map((mode) => (
                    <li
                      key={mode}
                      className="border-b border-zinc-200 pb-1 dark:border-zinc-700"
                    >
                      {mode}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
    </CalendaronsLayout>
  )
}
