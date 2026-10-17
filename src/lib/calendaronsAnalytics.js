export function isCalendaronsRoute(pathname) {
  return (
    pathname === '/projects/calendarons' ||
    pathname.startsWith('/projects/calendarons/')
  )
}

// Also filters client-side transitions after Analytics has loaded elsewhere.
export function excludeCalendaronsAnalytics(event) {
  try {
    return isCalendaronsRoute(new URL(event.url).pathname) ? null : event
  } catch {
    return null
  }
}
