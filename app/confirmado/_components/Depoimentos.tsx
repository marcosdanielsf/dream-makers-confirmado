"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Depoimento {
  nome: string
  headline: string
  videoSrc: string
  color: string
}

const depoimentos: Depoimento[] = [
  {
    nome: "Rickson Amorim",
    headline: "$200 emprestados pra comer → $108k no 1º ano",
    videoSrc: "/videos/depoimento-rickson.mp4",
    color: "#C9A961",
  },
  {
    nome: "Gilberto Abel",
    headline: "15 anos de faxina → nº 1 nacional",
    videoSrc: "/videos/depoimento-gilberto.mp4",
    color: "#1F3A2C",
  },
  {
    nome: "Claudia Fehribach",
    headline: "46 anos, ex-limpadora → $200k+ hoje",
    videoSrc: "/videos/depoimento-claudia.mp4",
    color: "#8a6b2a",
  },
]

function DepoimentoCard({ dep, onOpen }: { dep: Depoimento; onOpen: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Thumbnail 9:16 */}
      <button
        onClick={onOpen}
        className="relative w-full rounded-2xl overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961]"
        style={{ paddingBottom: "177.78%" }}
        aria-label={`Ver depoimento de ${dep.nome}`}
      >
        {/* Solid color placeholder */}
        <div
          className="absolute inset-0 flex items-end p-4"
          style={{ backgroundColor: dep.color }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 group-hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all group-hover:scale-110">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-white font-bold text-base">{dep.nome}</p>
          </div>
        </div>
      </button>

      {/* Text below */}
      <div>
        <p className="font-semibold text-white text-sm leading-snug">{dep.nome}</p>
        <p className="text-[#C9A961] text-xs mt-0.5">{dep.headline}</p>
      </div>
    </div>
  )
}

export function Depoimentos() {
  const [openVideo, setOpenVideo] = useState<Depoimento | null>(null)

  return (
    <section className="bg-[#1A1A1A] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#C9A961] text-sm tracking-[0.3em] uppercase font-semibold">
            Prova real
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl text-white font-bold mt-3">
            Quem fez antes de você
          </h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm">
            Nenhum desses começou com vantagem. O que muda é a decisão de aparecer quinta.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {depoimentos.map((dep) => (
            <DepoimentoCard
              key={dep.nome}
              dep={dep}
              onOpen={() => setOpenVideo(dep)}
            />
          ))}
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={!!openVideo} onOpenChange={(open) => !open && setOpenVideo(null)}>
        <DialogContent className="bg-black border-[#C9A961]/30 max-w-sm w-full p-0 rounded-2xl overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-white font-playfair">{openVideo?.nome}</DialogTitle>
            <p className="text-[#C9A961] text-sm">{openVideo?.headline}</p>
          </DialogHeader>
          <div className="mt-3">
            {openVideo && (
              <video
                src={openVideo.videoSrc}
                controls
                playsInline
                autoPlay
                className="w-full"
                style={{ maxHeight: "70vh" }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
