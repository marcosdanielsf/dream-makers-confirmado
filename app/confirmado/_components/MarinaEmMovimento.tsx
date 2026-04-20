"use client"

import { useState } from "react"
import { Play, Sparkles } from "lucide-react"

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Reel {
  id: string
  videoSrc: string
  instagramUrl: string
  author: string
  caption: string
  highlight: string
  accent: string
}

const reels: Reel[] = [
  {
    id: "bonus",
    videoSrc: "/videos/reel-marina-bonus.mp4",
    instagramUrl: "https://www.instagram.com/p/DWmBnmqj67o/",
    author: "@marina_bcouto",
    caption: "Quando a agência passa de $1M em produção",
    highlight: "Profit share da corretora",
    accent: "#C9A961",
  },
  {
    id: "evento",
    videoSrc: "/videos/reel-gustavo-evento.mp4",
    instagramUrl: "https://www.instagram.com/p/DDxEbWWpfLJ/",
    author: "@gustavo_hcouto",
    caption: "Na sala: protagonistas da próxima fase",
    highlight: "Liderança pelo exemplo",
    accent: "#1F3A2C",
  },
  {
    id: "andre-rosa",
    videoSrc: "/videos/reel-andre-rosa.mp4",
    instagramUrl: "https://www.instagram.com/p/DSTUWDvjkeb/",
    author: "@oficial.andrerosa",
    caption: "Acreditaram antes de tudo acontecer",
    highlight: "Líder fala dos Couto",
    accent: "#1F3A2C",
  },
  {
    id: "bianca",
    videoSrc: "/videos/reel-bianca-amorim.mp4",
    instagramUrl: "https://www.instagram.com/p/DTjIqfokWDr/",
    author: "@bianca_amorim",
    caption: "Café, pão de queijo e 9 anos de comunidade",
    highlight: "Mentora Bianca Amorim",
    accent: "#C9A961",
  },
  {
    id: "missao",
    videoSrc: "/videos/reel-marina-missao.mp4",
    instagramUrl: "https://www.instagram.com/p/C9CfF1HPfZB/",
    author: "@marina_bcouto",
    caption: "Nossa missão: comunidade brasileira nos EUA",
    highlight: "Jornada coletiva",
    accent: "#8a6b2a",
  },
]

function ReelCard({ reel, onOpen }: { reel: Reel; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group relative flex-shrink-0 w-[240px] sm:w-[260px] snap-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961] rounded-2xl overflow-hidden"
      aria-label={`Abrir reel: ${reel.caption}`}
    >
      {/* 9:16 vertical */}
      <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
        <video
          src={reel.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

        {/* Sparkle decoration (Make a Wish mood) */}
        <Sparkles
          className="absolute top-3 left-3 w-5 h-5 text-[#C9A961] drop-shadow-lg"
          fill={reel.accent}
        />

        {/* Instagram badge */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-1.5">
          <InstagramIcon className="w-4 h-4 text-white" />
        </div>

        {/* Play on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-[#C9A961]/90 flex items-center justify-center shadow-2xl">
            <Play className="w-6 h-6 text-[#1A1A1A] ml-0.5" fill="#1A1A1A" />
          </div>
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <p className="text-[#C9A961] text-[10px] tracking-[0.2em] uppercase font-semibold mb-1">
            {reel.highlight}
          </p>
          <p className="text-white font-semibold text-sm leading-snug">
            {reel.caption}
          </p>
          <p className="text-white/60 text-xs mt-1.5">{reel.author}</p>
        </div>
      </div>
    </button>
  )
}

export function MarinaEmMovimento() {
  const [openReel, setOpenReel] = useState<Reel | null>(null)

  return (
    <section className="relative bg-[#1A1A1A] py-20 px-6 overflow-hidden">
      {/* Ambient sparkles (Make a Wish mood) */}
      <div className="absolute top-10 left-10 opacity-30 pointer-events-none">
        <Sparkles className="w-8 h-8 text-[#C9A961]" fill="#C9A961" />
      </div>
      <div className="absolute bottom-20 right-12 opacity-20 pointer-events-none">
        <Sparkles className="w-6 h-6 text-[#C9A961]" fill="#C9A961" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#C9A961] text-sm tracking-[0.3em] uppercase font-semibold">
            Marina em movimento
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl text-white font-bold mt-3">
            A vida que você vai ver quinta
          </h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm">
            Não é aspiracional. É o que já acontece. Toca pra ver.
          </p>
        </div>

        {/* Mobile scroll + desktop grid */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-2 sm:px-0 sm:justify-center scrollbar-hide">
          {reels.map((reel) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              onOpen={() => setOpenReel(reel)}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/marina_bcouto/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#C9A961] text-sm transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            Segue @marina_bcouto
          </a>
        </div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={!!openReel} onOpenChange={(open) => !open && setOpenReel(null)}>
        <DialogContent className="bg-black border-[#C9A961]/30 max-w-sm w-full p-0 rounded-2xl overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-white font-playfair text-base">
              {openReel?.caption}
            </DialogTitle>
            <p className="text-[#C9A961] text-xs">{openReel?.author}</p>
          </DialogHeader>
          <div className="mt-3">
            {openReel && (
              <video
                src={openReel.videoSrc}
                controls
                playsInline
                autoPlay
                className="w-full"
                style={{ maxHeight: "70vh" }}
              />
            )}
          </div>
          {openReel && (
            <div className="p-4 pt-0">
              <a
                href={openReel.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C9A961] hover:text-white text-sm transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                Ver no Instagram
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
