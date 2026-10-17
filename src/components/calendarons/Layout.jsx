import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container } from '@/components/Container'
import { siteUrl } from '@/lib/site'

export const calendaronsPath = '/projects/calendarons'
const pages = [
  [calendaronsPath, 'Présentation'],
  [`${calendaronsPath}/support`, 'Aide'],
  [`${calendaronsPath}/privacy`, 'Confidentialité'],
]

export function CalendaronsLayout({ title, description, children }) {
  const { pathname } = useRouter()
  return (
    <>
      <Head>
        <title>{title} — Nicolas Goutay</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}${pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteUrl}${pathname}`} />
        <meta
          property="og:image"
          content={`${siteUrl}/images/calendarons/social.png`}
        />
        <meta
          property="og:image:alt"
          content="Calendarons, un calendrier pour iPhone, iPad et Mac"
        />
      </Head>
      <Container className="mt-16 sm:mt-28" lang="fr">
        <Link
          href="/projects"
          lang="en"
          className="text-sm text-zinc-500 hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
        >
          ← Projects
        </Link>
        <nav
          aria-label="Calendarons"
          className="mt-7 mb-12 flex flex-wrap gap-x-7 border-b border-zinc-100 text-sm dark:border-zinc-800"
        >
          {pages.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              className={`border-b-2 py-3 ${pathname === href ? 'border-teal-500 text-teal-700 dark:text-teal-400' : 'border-transparent text-zinc-600 hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-400'}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        {children}
        <footer className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-zinc-100 pt-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <span>Calendarons, par Nicolas Goutay</span>
          <Link
            href={`${calendaronsPath}/support`}
            className="hover:text-teal-600 dark:hover:text-teal-400"
          >
            Aide et contact
          </Link>
          <Link
            href={`${calendaronsPath}/privacy`}
            className="hover:text-teal-600 dark:hover:text-teal-400"
          >
            Confidentialité
          </Link>
        </footer>
      </Container>
    </>
  )
}
