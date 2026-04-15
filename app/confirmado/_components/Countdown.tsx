"use client"

import { useState, useEffect } from "react"
import { getNextThursdayAt8pmEDT, calcTimeLeft, type TimeLeft } from "@/lib/countdown"

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
  const [target] = useState<Date>(() => getNextThursdayAt8pmEDT())
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(getNextThursdayAt8pmEDT()))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(target))
    }, 1000)
    return () => clearInterval(interval)
  }, [target])

  return (
    <section className="bg-[#1A1A1A] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#C9A961] text-sm tracking-[0.3em] uppercase font-medium mb-4">
          A call começa em
        </p>
        <h2 className="font-playfair text-2xl sm:text-3xl text-white mb-12">
          Quinta-feira · 20h EDT (horário de Nova York)
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
          Bloqueie essa quinta na sua agenda agora. Você vai entender por quê vale cada minuto.
        </p>
      </div>
    </section>
  )
}
