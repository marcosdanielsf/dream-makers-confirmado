import { toZonedTime, fromZonedTime } from "date-fns-tz"

const EDT_TZ = "America/New_York"

/**
 * Retorna a próxima quinta-feira às 20h EDT a partir de agora.
 * Se hoje for quinta e ainda não chegou às 20h, retorna hoje.
 */
export function getNextThursdayAt8pmEDT(): Date {
  const now = new Date()
  const nowNY = toZonedTime(now, EDT_TZ)

  // dia da semana: 0=Dom, 4=Qui
  const dayOfWeek = nowNY.getDay()
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7

  const candidate = new Date(nowNY)
  candidate.setDate(candidate.getDate() + daysUntilThursday)
  candidate.setHours(20, 0, 0, 0)

  // Se já passou das 20h na quinta atual, avança 7 dias
  if (candidate <= nowNY) {
    candidate.setDate(candidate.getDate() + 7)
  }

  // Converte de volta para UTC
  return fromZonedTime(candidate, EDT_TZ)
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
