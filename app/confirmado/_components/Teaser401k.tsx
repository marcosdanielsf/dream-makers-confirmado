"use client"

import { useState } from "react"
import { Play, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function Teaser401k() {
  const [open, setOpen] = useState(false)

  return (
    <section className="bg-[#FAF7F0] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[#1F3A2C] text-sm tracking-[0.3em] uppercase font-semibold">
            Enquanto você espera quinta
          </span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="group relative w-full rounded-3xl overflow-hidden shadow-xl cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A961] block"
          aria-label="Assistir teaser: Por que o 401k é uma bomba-relógio"
        >
          {/* Thumbnail */}
          <div className="relative bg-gradient-to-br from-[#1F3A2C] to-[#1A1A1A] aspect-video flex items-center justify-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-32 h-32 rounded-full bg-[#C9A961] blur-3xl" />
              <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-[#C9A961] blur-2xl" />
            </div>

            {/* Duration badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <Clock className="w-3.5 h-3.5 text-[#C9A961]" />
              <span className="text-white text-xs font-medium">3 min</span>
            </div>

            {/* Play button */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#C9A961] group-hover:bg-[#b8943e] flex items-center justify-center transition-all group-hover:scale-110 shadow-2xl">
                <Play className="w-9 h-9 text-[#1A1A1A] ml-1" fill="#1A1A1A" />
              </div>
            </div>

            {/* Overlay title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="font-playfair text-white text-xl sm:text-2xl font-bold leading-snug">
                Assista enquanto você espera:{" "}
                <span className="text-[#C9A961]">Por que o 401k é uma bomba-relógio</span>{" "}
                (3 min)
              </h3>
            </div>
          </div>
        </button>

        <p className="text-center text-[#1A1A1A]/50 text-sm mt-6">
          Entenda em 3 minutos o que a maioria dos americanos vai descobrir tarde demais.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-black border-[#C9A961]/30 max-w-2xl w-full p-0 rounded-2xl overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-white font-playfair text-lg">
              Por que o 401k é uma bomba-relógio
            </DialogTitle>
          </DialogHeader>
          <div className="mt-3">
            <video
              src="/videos/teaser-401k.mp4"
              controls
              playsInline
              autoPlay
              className="w-full"
              style={{ maxHeight: "60vh" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
