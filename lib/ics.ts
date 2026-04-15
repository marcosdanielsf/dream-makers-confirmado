import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"

function formatICSDate(date: Date): string {
  // Format: YYYYMMDDTHHmmssZ (UTC)
  return format(date, "yyyyMMdd'T'HHmmss'Z'")
}

export interface ICSEvent {
  title: string
  start: Date
  durationMinutes: number
  description: string
  location?: string
}

export function generateICS(event: ICSEvent): string {
  const uid = `dream-makers-${event.start.getTime()}@dreammakersfinancial.com`
  const now = formatICSDate(new Date())
  const startStr = formatICSDate(event.start)
  const endDate = new Date(event.start.getTime() + event.durationMinutes * 60 * 1000)
  const endStr = formatICSDate(endDate)

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dream Makers Financial//NONSGML v1.0//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    event.location ? `LOCATION:${event.location}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n")
}

export function downloadICS(event: ICSEvent): void {
  const icsContent = generateICS(event)
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "dream-makers-call.ics"
  a.click()
  URL.revokeObjectURL(url)
}

export function getGoogleCalendarUrl(event: ICSEvent): string {
  const startStr = format(toZonedTime(event.start, "America/New_York"), "yyyyMMdd'T'HHmmss")
  const endDate = new Date(event.start.getTime() + event.durationMinutes * 60 * 1000)
  const endStr = format(toZonedTime(endDate, "America/New_York"), "yyyyMMdd'T'HHmmss")

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${startStr}/${endStr}`,
    details: event.description,
    ctz: "America/New_York",
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function getOutlookCalendarUrl(event: ICSEvent): string {
  const params = new URLSearchParams({
    subject: event.title,
    startdt: event.start.toISOString(),
    enddt: new Date(event.start.getTime() + event.durationMinutes * 60 * 1000).toISOString(),
    body: event.description,
  })

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}
