export function formatTime(
  iso: string,
  locale = "sr-RS",
  tz = "Europe/Belgrade"
) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale, {
    timeZone: tz,
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatClock(
  ts: number,
  locale = "sr-RS",
  tz = "Europe/Belgrade"
) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(ts));
}
