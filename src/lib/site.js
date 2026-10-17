export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.phacks.dev',
).origin
