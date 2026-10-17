import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import '@/styles/tailwind.css'

function usePrevious(value) {
  const [history, setHistory] = useState({
    current: value,
    previous: undefined,
  })
  if (value !== history.current) {
    setHistory({ current: value, previous: history.current })
    return history.current
  }
  return history.previous
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
      <Analytics />
    </>
  )
}
