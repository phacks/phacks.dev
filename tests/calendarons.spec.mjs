import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

test('Calendarons pages, disclosures and privacy work on desktop and mobile', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/projects')
  await page.getByRole('link', { name: 'Calendarons', exact: true }).click()
  await expect(page).toHaveURL('/projects/calendarons')
  await expect(
    page.getByRole('heading', { name: 'Calendarons', exact: true }),
  ).toBeVisible()
  await expect(page.locator('main [lang="fr"]')).toBeVisible()
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://www.phacks.dev/projects/calendarons',
  )
  for (const image of await page.locator('main img').all()) {
    await expect(image).toHaveJSProperty('complete', true)
    expect(await image.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0)
  }
  await expect(
    page
      .getByRole('navigation', { name: 'Calendarons' })
      .getByRole('link', { name: 'Présentation' }),
  ).toHaveAttribute('aria-current', 'page')
  await page.getByRole('link', { name: 'Consulter l’aide' }).click()
  await expect(page).toHaveURL('/projects/calendarons/support')
  await expect(page.locator('details')).toHaveCount(5)
  await expect(page.getByRole('link', { name: 'calendarons@gmail.com', exact: true })).toHaveAttribute('href', 'mailto:calendarons@gmail.com')
  await page.getByText('Partager avec mon partenaire', { exact: true }).click()
  await expect(page.locator('#partner')).toHaveAttribute('open', '')
  await expect(page.locator('#partner')).toContainText('Commun')
  await page
    .getByRole('navigation', { name: 'Calendarons' })
    .getByRole('link', { name: 'Confidentialité' })
    .click()
  await expect(
    page.getByRole('heading', { name: 'Confidentialité', exact: true }),
  ).toBeVisible()
  await expect(page.locator('main')).toContainText(
    'La mesure d’audience Vercel Analytics est désactivée',
  )
  await expect(page.locator('main')).not.toContainText('placeholder@gmail.com')
  await page.getByRole('button', { name: 'Toggle dark mode' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  for (const route of ['', '/support', '/privacy']) {
    await page.goto(`/projects/calendarons${route}`)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    await expect(page.locator('script[src*="insights"]')).toHaveCount(0)
  }
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto('/projects/calendarons')
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  expect(errors).toEqual([])
})

test('Calendarons URLs are excluded from analytics including client navigation', async () => {
  const source = readFileSync(
    new URL('../src/lib/calendaronsAnalytics.js', import.meta.url),
    'utf8',
  )
  const { excludeCalendaronsAnalytics } = await import(
    `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`
  )
  for (const path of [
    '/projects/calendarons',
    '/projects/calendarons/support',
    '/projects/calendarons/privacy?x=1',
  ]) {
    expect(
      excludeCalendaronsAnalytics({
        url: `https://www.phacks.dev${path}`,
        type: 'pageview',
      }),
    ).toBeNull()
  }
  const normal = { url: 'https://www.phacks.dev/projects', type: 'pageview' }
  expect(excludeCalendaronsAnalytics(normal)).toEqual(normal)
})
