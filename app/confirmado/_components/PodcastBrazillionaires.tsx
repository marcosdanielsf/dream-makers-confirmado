"use client"

import { useState } from "react"
import { Play, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  )
}

interface Episode {
  ytId: string
  title: string
  subtitle: string
  durationMin: number
  featured?: boolean
}

const episodes: Episode[] = [
  {
    ytId: "hHWyTT_3APA",
    title: "A origem do nome Brazillionaires",
    subtitle: "Live • Canal Dinheiro nos EUA",
    durationMin: 17,
    featured: true,
  },
  {
    ytId: "ftGyUdTtuic",
    title: "Rickson Amorin — ep 05",
    subtitle: "$200 emprestados pra comer → $108k no 1º ano",
    durationMin: 12,
  },
  {
    ytId: "2U8HX0wUcKU",
    title: "Milton & Adriana Abreu — ep 01",
    subtitle: "O casal que abriu a fronteira",
    durationMin: 14,
  },
  {
    ytId: "kOTUICvMlGY",
    title: "Fernanda e Guilherme Lappe — ep 08",
    subtitle: "Lappe Financial, construindo marca",
    durationMin: 15,
  },
  {
    ytId: "9p7CupWOEFg",
    title: "Andre Rosa e Barbara Brum — ep 09",
    subtitle: "Casal top-producer Five Rings",
    durationMin: 16,
  },
]

function EpisodeCard({ ep, onOpen }: { ep: Episode; onOpen: () => void }) {
  const thumbUrl = `https://i.ytimg.com/vi/${ep.ytId}/hqdefault.jpg`

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("ambient-audio-duck"))
    onOpen()
  }

  return (
    <button
      onClick={handleClick}
      className={`group relative flex-shrink-0 text-left ${
        ep.featured ? "w-full sm:w-[420px]" : "w-[260px] sm:w-[280px]"
      } snap-center rounded-2xl overflow-hidden bg-[#0f0f0f] border border-white/5 hover:border-[#C9A961]/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961]`}
      aria-label={`Assistir aqui: ${ep.title}`}
    >
      {/* Thumbnail 16:9 */}
      <div className="relative aspect-video bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbUrl}
          alt={ep.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Duration */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Clock className="w-3 h-3 text-[#C9A961]" />
          <span className="text-white text-[11px] font-medium">{ep.durationMin} min</span>
        </div>

        {/* Featured badge */}
        {ep.featured && (
          <div className="absolute top-3 left-3 bg-[#C9A961] text-[#1A1A1A] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
            Comece aqui
          </div>
        )}

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#C9A961]/90 group-hover:bg-[#C9A961] group-hover:scale-110 transition-all flex items-center justify-center shadow-2xl">
            <Play className="w-6 h-6 text-[#1A1A1A] ml-0.5" fill="#1A1A1A" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-playfair text-white font-bold text-base leading-snug line-clamp-2">
          {ep.title}
        </h3>
        <p className="text-white/50 text-xs mt-2 line-clamp-1">{ep.subtitle}</p>
        <div className="flex items-center gap-1.5 mt-3 text-[#C9A961] text-xs font-medium">
          <Play className="w-3 h-3" fill="currentColor" />
          <span>Assistir aqui</span>
        </div>
      </div>
    </button>
  )
}

export function PodcastBrazillionaires() {
  const [openEpisode, setOpenEpisode] = useState<Episode | null>(null)
  const [featured, ...rest] = episodes

  return (
    <section className="bg-[#0A0A0A] py-20 px-6 border-t border-[#C9A961]/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#C9A961] text-sm tracking-[0.3em] uppercase font-semibold">
            Mergulhe fundo
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl text-white font-bold mt-3">
            Podcast Brazillionaires
          </h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm">
            Conversas completas com quem construiu do zero. Escute no trajeto pro trabalho — chega na quinta pronto.
          </p>
        </div>

        {/* Featured episode — full width */}
        <div className="mb-6">
          <EpisodeCard ep={featured} onOpen={() => setOpenEpisode(featured)} />
        </div>

        {/* Rest — horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-2 sm:px-0 sm:justify-center scrollbar-hide">
          {rest.map((ep) => (
            <EpisodeCard key={ep.ytId} ep={ep} onOpen={() => setOpenEpisode(ep)} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.youtube.com/@DinheironosEUA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#C9A961] text-sm transition-colors"
          >
            <YoutubeIcon className="w-4 h-4" />
            Canal Dinheiro nos EUA
          </a>
        </div>
      </div>

      {/* Inline player dialog — iframe YouTube com autoplay */}
      <Dialog
        open={!!openEpisode}
        onOpenChange={(open) => {
          if (!open) {
            setOpenEpisode(null)
            window.dispatchEvent(new CustomEvent("ambient-audio-resume"))
          }
        }}
      >
        <DialogContent className="bg-black border-[#C9A961]/30 max-w-3xl w-full p-0 rounded-2xl overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-white font-playfair text-lg leading-snug">
              {openEpisode?.title}
            </DialogTitle>
            <p className="text-[#C9A961] text-xs mt-1">{openEpisode?.subtitle}</p>
          </DialogHeader>
          <div className="mt-3 aspect-video bg-black">
            {openEpisode && (
              <iframe
                src={`https://www.youtube.com/embed/${openEpisode.ytId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={openEpisode.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
          {openEpisode && (
            <div className="p-4 pt-3">
              <a
                href={`https://youtu.be/${openEpisode.ytId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/40 hover:text-[#C9A961] text-xs transition-colors"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
                Abrir no YouTube
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
