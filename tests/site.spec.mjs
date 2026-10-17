import { test, expect } from '@playwright/test'

test('homepage, work history, and theme toggle survive hydration', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Nice to meet you.' }),
  ).toBeVisible()
  const swaive = page.getByRole('listitem').filter({ hasText: 'Swaive' })
  await expect(swaive).toContainText('CTO')
  await expect(swaive).toContainText('2024 — Present')
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Orbit' }),
  ).toContainText('2020 — 2024')
  await expect(swaive.locator('img')).toHaveJSProperty('naturalWidth', 256)
  await expect(swaive.locator('img')).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  )
  await page.getByRole('button', { name: 'Toggle dark mode' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.reload()
  await expect(page.locator('html')).toHaveClass(/dark/)
  expect(errors).toEqual([])
})

test('navigation opens an article and renders MDX', async ({
  page,
  isMobile,
}) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  if (isMobile)
    await page.getByRole('button', { name: 'Menu', exact: true }).click()
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Articles', exact: true })
    .filter({ visible: true })
    .click()
  await expect(page).toHaveURL('/articles')
  await page.locator('main article h2 a').first().click()
  await expect(page.locator('main article h1')).toBeVisible()
  await expect(page.locator('main article .prose')).not.toBeEmpty()
  await expect(page).toHaveTitle(/Nicolas Goutay/)
  await page.getByRole('button', { name: 'Go back to articles' }).click()
  await expect(page).toHaveURL('/articles')
  expect(errors).toEqual([])
})

test('public pages and feeds are served by the production build', async ({
  request,
}) => {
  for (const route of [
    '/about',
    '/articles',
    '/projects',
    '/speaking',
    '/uses',
  ]) {
    expect((await request.get(route)).status(), route).toBe(200)
  }
  const response = await request.get('/rss/feed.json')
  expect(response.status()).toBe(200)
  const feed = await response.json()
  expect(feed.home_page_url).toBe('https://www.phacks.dev')
  expect(feed.items.length).toBeGreaterThan(0)
  for (const item of feed.items) {
    expect(item.url).toMatch(/^https:\/\/www\.phacks\.dev\/articles\//)
    expect(item.content_html.length).toBeGreaterThan(0)
    expect(
      (await request.get(new URL(item.url).pathname)).status(),
      item.url,
    ).toBe(200)
  }
  const xml = await request.get('/rss/feed.xml')
  expect(xml.status()).toBe(200)
  expect(await xml.text()).toContain('<rss')
  expect((await request.get('/this-page-does-not-exist')).status()).toBe(404)
})
