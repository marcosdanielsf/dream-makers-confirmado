"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  getNextThursdayAt8pmEDT,
  calcTimeLeft,
  parseCallDate,
  formatCallDatePtBR,
  type TimeLeft,
} from "@/lib/countdown"

function CountBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="bg-[#1F3A2C] border border-[#C9A961]/30 rounded-xl px-4 sm:px-6 py-3 sm:py-4 min-w-[72px] sm:min-w-[96px]">
          <span className="font-dm-serif text-5xl sm:text-6xl md:text-7xl text-[#C9A961] block text-center tabular-nums leading-none">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute inset-0 rounded-xl bg-[#C9A961]/5 pointer-events-none" />
      </div>
      <span className="text-xs sm:text-sm text-white/50 tracking-[0.2em] uppercase font-medium">
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const searchParams = useSearchParams()

  // Data da call: tenta ler de query param ?d=. Se invalido/ausente → modo "sem data" (nao mente com fallback).
  const [target, setTarget] = useState<Date | null>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [dateLabel, setDateLabel] = useState<string>("")
  const [hasValidDate, setHasValidDate] = useState<boolean | null>(null)

  useEffect(() => {
    const rawDate = searchParams.get("d")
    const parsed = parseCallDate(rawDate)
    if (parsed) {
      setTarget(parsed)
      setDateLabel(formatCallDatePtBR(parsed))
      setTimeLeft(calcTimeLeft(parsed))
      setHasValidDate(true)
    } else {
      setHasValidDate(false)
    }
  }, [searchParams])

  useEffect(() => {
    if (!target) return
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(target))
    }, 1000)
    return () => clearInterval(interval)
  }, [target])

  // Loading inicial (pre-hidratacao)
  if (hasValidDate === null) {
    return (
      <section className="bg-[#1A1A1A] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/40 text-sm">Carregando...</p>
        </div>
      </section>
    )
  }

  // Sem data valida no ?d= → nao mente com fallback. Guia o lead pro e-mail.
  if (!hasValidDate || !target || !timeLeft) {
    return (
      <section className="bg-[#1A1A1A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C9A961] text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Reunião confirmada
          </p>
          <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-6">
            Verifique data e horário no seu e-mail de confirmação.
          </h2>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Você também pode conferir no WhatsApp ou na confirmação automática enviada pelo nosso time.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#1A1A1A] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#C9A961] text-sm tracking-[0.3em] uppercase font-medium mb-4">
          Sua call começa em
        </p>
        <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-12">
          {dateLabel}
        </h2>

        {timeLeft.isOver ? (
          <div className="py-12">
            <p className="font-playfair text-4xl sm:text-5xl text-[#C9A961] font-bold animate-pulse">
              COMEÇOU. Entra agora.
            </p>
          </div>
        ) : (
          <div className="flex items-start justify-center gap-3 sm:gap-6">
            <CountBox value={timeLeft.days} label="Dias" />
            <span className="font-dm-serif text-4xl sm:text-5xl text-[#C9A961]/40 mt-3">:</span>
            <CountBox value={timeLeft.hours} label="Horas" />
            <span className="font-dm-serif text-4xl sm:text-5xl text-[#C9A961]/40 mt-3">:</span>
            <CountBox value={timeLeft.minutes} label="Min" />
            <span className="font-dm-serif text-4xl sm:text-5xl text-[#C9A961]/40 mt-3">:</span>
            <CountBox value={timeLeft.seconds} label="Seg" />
          </div>
        )}

        <p className="text-white/40 text-sm mt-10 max-w-md mx-auto">
          Bloqueie essa data na sua agenda agora. Você vai entender por quê vale cada minuto.
        </p>
      </div>
    </section>
  )
}
