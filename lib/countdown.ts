import { toZonedTime, fromZonedTime, format as formatTz } from "date-fns-tz"

const EDT_TZ = "America/New_York"

/**
 * Tenta parsear um datetime ISO vindo de query param (?d=2026-04-17T20:00:00-04:00).
 * Aceita:
 *  - ISO completo com timezone: "2026-04-17T20:00:00-04:00"
 *  - ISO sem timezone (assume EDT): "2026-04-17T20:00:00"
 *  - Timestamp unix em ms: "1745177400000"
 * Retorna null se invalido.
 */
export function parseCallDate(raw: string | null | undefined): Date | null {
  if (!raw) return null
  const trimmed = String(raw).trim()
  if (!trimmed) return null

  // Timestamp unix ms
  if (/^\d{10,}$/.test(trimmed)) {
    const d = new Date(parseInt(trimmed, 10) * (trimmed.length === 10 ? 1000 : 1))
    return isNaN(d.getTime()) ? null : d
  }

  // ISO sem timezone → assume EDT
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(trimmed)) {
    const d = fromZonedTime(trimmed, EDT_TZ)
    return isNaN(d.getTime()) ? null : d
  }

  // ISO completo com TZ (ex: "2026-04-20T09:59:00-04:00")
  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
    const d = new Date(trimmed)
    return isNaN(d.getTime()) ? null : d
  }

  // Fallback tolerante: GHL pode mandar formato humano en-US
  // Ex: "Monday, April 20, 2026 9:59 AM" — new Date() aceita nativo, assume local.
  // Tratamos como EDT (timezone do cliente Marina) pra consistencia.
  const fallback = new Date(trimmed)
  if (!isNaN(fallback.getTime())) {
    // Reinterpreta no fuso EDT: extrai componentes locais e converte.
    // Como JS assume timezone do runtime, precisamos normalizar pra EDT.
    const iso = `${fallback.getFullYear()}-${String(fallback.getMonth() + 1).padStart(2, "0")}-${String(
      fallback.getDate()
    ).padStart(2, "0")}T${String(fallback.getHours()).padStart(2, "0")}:${String(fallback.getMinutes()).padStart(
      2,
      "0"
    )}:${String(fallback.getSeconds()).padStart(2, "0")}`
    const edt = fromZonedTime(iso, EDT_TZ)
    return isNaN(edt.getTime()) ? null : edt
  }

  return null
}

/**
 * Retorna a próxima quinta-feira às 20h EDT a partir de agora.
 * Fallback usado quando nao tem query param ?d= valido.
 */
export function getNextThursdayAt8pmEDT(): Date {
  const now = new Date()
  const nowNY = toZonedTime(now, EDT_TZ)

  const dayOfWeek = nowNY.getDay()
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7

  const candidate = new Date(nowNY)
  candidate.setDate(candidate.getDate() + daysUntilThursday)
  candidate.setHours(20, 0, 0, 0)

  if (candidate <= nowNY) {
    candidate.setDate(candidate.getDate() + 7)
  }

  return fromZonedTime(candidate, EDT_TZ)
}

/**
 * Formata a data da call em PT-BR para display humano.
 * Ex: "Quinta-feira, 17 de abril · 20h EDT (horário de Nova York)"
 */
export function formatCallDatePtBR(target: Date): string {
  const targetNY = toZonedTime(target, EDT_TZ)

  const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
  const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]

  const weekday = weekdays[targetNY.getDay()]
  const day = targetNY.getDate()
  const month = months[targetNY.getMonth()]

  const hours = targetNY.getHours()
  const minutes = targetNY.getMinutes()
  const hourStr = minutes === 0 ? `${hours}h` : `${hours}h${String(minutes).padStart(2, "0")}`

  // Detecta se e EDT ou EST (daylight saving)
  const tzAbbr = formatTz(targetNY, "zzz", { timeZone: EDT_TZ })

  return `${weekday}, ${day} de ${month} · ${hourStr} ${tzAbbr} (horário de Nova York)`
}

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isOver: boolean
}

export function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, isOver: false }
}
