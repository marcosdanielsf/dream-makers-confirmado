"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { CalendarDays, Apple, Building2 } from "lucide-react"
import { getNextThursdayAt8pmEDT, parseCallDate } from "@/lib/countdown"
import { downloadICS, getGoogleCalendarUrl, getOutlookCalendarUrl } from "@/lib/ics"

const EVENT_TITLE = "Call de Grupo Dream Makers — Sua carreira como agente financeiro"
const EVENT_DESCRIPTION =
  "Participe da call ao vivo com Marina Couto e o time Dream Makers Financial. Link Zoom será enviado por WhatsApp. Chegue na hora — começa pontual."

export function CalendarButtons() {
  const searchParams = useSearchParams()

  const target = useMemo(() => {
    const rawDate = searchParams.get("d")
    return parseCallDate(rawDate) ?? getNextThursdayAt8pmEDT()
  }, [searchParams])

  const event = {
    title: EVENT_TITLE,
    start: target,
    durationMinutes: 90,
    description: EVENT_DESCRIPTION,
    location: "Zoom — link enviado por WhatsApp",
  }

  return (
    <section className="bg-[#1F3A2C] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-3">
          <span className="text-[#C9A961] text-sm tracking-[0.3em] uppercase font-semibold">
            Não perca
          </span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-4xl text-white font-bold mb-4">
          Adicionar ao calendário
        </h2>
        <p className="text-white/60 text-base mb-10 max-w-md mx-auto">
          1 clique aqui = 20% mais chance de você chegar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.open(getGoogleCalendarUrl(event), "_blank")}
            className="flex items-center justify-center gap-3 bg-white text-[#1A1A1A] hover:bg-[#C9A961] hover:text-[#1A1A1A] font-semibold rounded-xl px-6 py-4 transition-all shadow-sm group"
          >
            <CalendarDays className="w-5 h-5 text-[#C9A961] group-hover:text-[#1A1A1A] transition-colors" />
            Google Calendar
          </button>

          <button
            onClick={() => downloadICS(event)}
            className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white hover:bg-[#C9A961] hover:text-[#1A1A1A] hover:border-[#C9A961] font-semibold rounded-xl px-6 py-4 transition-all group"
          >
            <Apple className="w-5 h-5 text-white group-hover:text-[#1A1A1A] transition-colors" />
            Apple Calendar
          </button>

          <button
            onClick={() => window.open(getOutlookCalendarUrl(event), "_blank")}
            className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white hover:bg-[#C9A961] hover:text-[#1A1A1A] hover:border-[#C9A961] font-semibold rounded-xl px-6 py-4 transition-all group"
          >
            <Building2 className="w-5 h-5 text-white group-hover:text-[#1A1A1A] transition-colors" />
            Outlook
          </button>
        </div>
      </div>
    </section>
  )
}
