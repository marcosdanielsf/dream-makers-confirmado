"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { parseCallDate, formatCallDatePtBR } from "@/lib/countdown"

export function Hero() {
  const searchParams = useSearchParams()
  const nome = searchParams.get("n")
  const rawDate = searchParams.get("d")

  const [dateLabel, setDateLabel] = useState<string | null>(null)

  useEffect(() => {
    const parsed = parseCallDate(rawDate)
    if (parsed) {
      setDateLabel(formatCallDatePtBR(parsed))
    } else {
      setDateLabel(null)
    }
  }, [rawDate])

  const handleScroll = () => {
    const el = document.getElementById("levar")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src="/videos/marina-confirmacao.mp4"
        aria-hidden="true"
      />

      {/* Gradient fallback / overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1F3A2C]/60 to-[#1A1A1A]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A961]/10 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#C9A961]/15 border border-[#C9A961]/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#C9A961] animate-pulse" />
          <span className="text-[#C9A961] text-sm font-medium tracking-wide">Dream Makers Financial</span>
        </div>

        {/* Headline */}
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white">
          {nome ? (
            <>
              Você confirmou,{" "}
              <span className="text-[#C9A961]">{nome}.</span>
              <br />
              Agora prepare-se.
            </>
          ) : (
            <>
              Você confirmou.
              <br />
              <span className="text-[#C9A961]">Agora prepare-se.</span>
            </>
          )}
        </h1>

        {/* Subtitle — dinamico via ?d= ou fallback neutro */}
        <p className="text-xl sm:text-2xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
          {dateLabel ? (
            <>
              <span className="text-[#C9A961] font-medium">{dateLabel}.</span>{" "}
              Sua vida financeira muda aqui.
            </>
          ) : (
            <>Sua vida financeira muda aqui.</>
          )}
        </p>

        {/* CTA */}
        <button
          onClick={handleScroll}
          className="group inline-flex flex-col items-center gap-2 text-white/60 hover:text-[#C9A961] transition-colors"
        >
          <span className="text-sm tracking-widest uppercase">Ver o que você vai levar</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
    </section>
  )
}
