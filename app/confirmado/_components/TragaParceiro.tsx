"use client"

import { Share2, Link2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const SHARE_MSG =
  "Oi amor, vou participar de uma reunião na quinta 20h sobre uma carreira nos EUA. Quero que você veja comigo — assiste esse vídeo antes: "

export function TragaParceiro() {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "https://dreammakers.vercel.app/confirmado"

  const handleShare = async () => {
    const fullMsg = SHARE_MSG + pageUrl

    // Web Share API (mobile)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Dream Makers Financial — Call quinta 20h EDT",
          text: fullMsg,
          url: pageUrl,
        })
        return
      } catch {
        // cancelado pelo usuário — ok
        return
      }
    }

    // Desktop fallback — copia link
    try {
      await navigator.clipboard.writeText(pageUrl)
      toast({
        variant: "success",
        title: "Link copiado!",
        description: "Cola no WhatsApp do seu parceiro(a).",
      })
    } catch {
      toast({
        title: "Copie o link",
        description: pageUrl,
      })
    }
  }

  return (
    <section className="bg-[#FAF7F0] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10">
          {/* Gold gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C9A961] via-[#b8943e] to-[#8a6b2a]" />
          <div className="absolute inset-0 bg-gradient-to-tl from-black/20 to-transparent" />

          <div className="relative z-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Share2 className="w-7 h-7 text-white" />
            </div>

            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Quem decide isso com você?
            </h2>

            <p className="text-[#1A1A1A]/70 text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto">
              Se o seu marido, esposa, ou parceiro não ver essa call com você, a decisão vai ficar só na sua cabeça —
              e provavelmente vai empacar.{" "}
              <strong className="text-[#1A1A1A]">Compartilha comigo.</strong>
            </p>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white hover:bg-[#1F3A2C] font-semibold rounded-xl px-7 py-4 transition-all text-base shadow-lg"
            >
              <Link2 className="w-5 h-5" />
              Compartilhar com meu parceiro(a)
            </button>

            <p className="text-[#1A1A1A]/50 text-xs mt-4">
              Mobile: abre WhatsApp direto · Desktop: copia o link
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
