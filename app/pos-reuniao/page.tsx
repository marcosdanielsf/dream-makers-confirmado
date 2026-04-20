"use client"

import { useState, useRef } from "react"
import { Play, Download, ShieldCheck, MessageCircle } from "lucide-react"

const PDF_URL = "/pdf/o-projeto-da-prosperidade.pdf"
const VIDEO_URL = "/videos/pos-call-consolidacao.mp4"

export default function PosReuniaoPage() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setPlaying(true)
    setTimeout(() => {
      videoRef.current?.play().catch(() => {})
    }, 50)
  }

  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-14 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F3A2C]/40 via-[#1A1A1A] to-[#1A1A1A]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#C9A961]/15 border border-[#C9A961]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#C9A961] animate-pulse" />
            <span className="text-[#C9A961] text-sm font-medium tracking-wide">
              Pós-call · Dream Makers Financial
            </span>
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Você já viu.{" "}
            <span className="text-[#C9A961]">Agora decide.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 font-light max-w-2xl mx-auto">
            Consolida o que a Marina mostrou na call. 6 minutos pra
            organizar a ideia antes do seu 1:1.
          </p>
        </div>
      </section>

      {/* VIDEO BLOCK */}
      <section className="px-6 pb-14">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video">
            {!playing ? (
              <button
                onClick={handlePlay}
                aria-label="Reproduzir vídeo de consolidação"
                className="absolute inset-0 w-full h-full group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A961]"
              >
                {/* Poster — cor sólida Dream Makers com elementos */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F3A2C] via-[#1A1A1A] to-[#1F3A2C]" />

                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#C9A961]/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  <span className="text-[#1A1A1A] text-xs font-semibold tracking-wide">
                    FL DFS Licenciado
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-xs font-medium">6 min</span>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                  <div className="w-20 h-20 rounded-full bg-[#C9A961] group-hover:bg-[#b8943e] flex items-center justify-center transition-all group-hover:scale-110 shadow-2xl">
                    <Play className="w-9 h-9 text-[#1A1A1A] ml-1" fill="#1A1A1A" />
                  </div>
                  <p className="font-playfair text-white text-xl sm:text-2xl font-bold leading-snug text-center px-6 max-w-lg">
                    Os 3 pilares da decisão, recapitulados.
                  </p>
                </div>
              </button>
            ) : (
              <video
                ref={videoRef}
                src={VIDEO_URL}
                controls
                playsInline
                autoPlay
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* BLUEPRINT PDF */}
      <section className="px-6 pb-14">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#1F3A2C] to-[#1A1A1A] border border-[#C9A961]/30 rounded-3xl p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 w-24 h-28 sm:w-28 sm:h-32 rounded-xl bg-[#C9A961] flex items-center justify-center shadow-lg">
                <div className="text-center px-2">
                  <p className="font-playfair text-[#1A1A1A] text-[10px] sm:text-xs font-bold leading-tight">
                    O Projeto da Prosperidade
                  </p>
                  <p className="text-[#1A1A1A]/60 text-[9px] mt-1 font-medium">
                    14 slides · PDF
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-[#C9A961] text-xs tracking-[0.2em] uppercase font-semibold mb-2">
                  Sua cópia pra estudar
                </p>
                <h2 className="font-playfair text-2xl sm:text-3xl text-white font-bold mb-3 leading-snug">
                  O Projeto da Prosperidade
                </h2>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                  O guia definitivo pra construir uma carreira sólida,
                  segura e rentável como agente financeiro licenciado.
                  Pra comunidade brasileira. Baseado em regulamentações
                  estaduais norte-americanas (NAIC).
                </p>

                <a
                  href={PDF_URL}
                  download="O-Projeto-da-Prosperidade.pdf"
                  className="inline-flex items-center gap-2 bg-[#C9A961] hover:bg-[#b8943e] text-[#1A1A1A] font-semibold rounded-xl px-5 py-3 transition-all shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Baixar o PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRÓXIMO PASSO — placeholder até definir CTA real */}
      <section className="px-6 pb-20 pt-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1F3A2C]/40 border border-[#C9A961]/20 rounded-3xl p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 bg-[#C9A961]/15 rounded-full px-4 py-1.5 mb-6">
              <MessageCircle className="w-4 h-4 text-[#C9A961]" />
              <span className="text-[#C9A961] text-sm font-medium tracking-wide">
                Próximo passo
              </span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl text-white font-bold mb-4 leading-tight">
              Você fez sua parte.
              <br />
              <span className="text-[#C9A961]">Agora é com a gente.</span>
            </h2>

            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              O time Dream Makers entra em contato pelo WhatsApp nas
              próximas horas pra conduzir seus próximos passos.
            </p>

            <p className="text-white/40 text-xs mt-8">
              Fique atento ao número que você usou pra agendar a call.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER MINIMAL */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-white/30 text-xs">
          Dream Makers Financial · Licenciado pelo Florida Department of
          Financial Services
        </p>
      </footer>
    </main>
  )
}
