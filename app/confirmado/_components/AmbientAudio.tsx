"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Volume2, VolumeX } from "lucide-react"

const TRACKS = [
  "/audio/ambient-a.mp3",
  "/audio/ambient-b.mp3",
  "/audio/ambient-c.mp3",
  "/audio/ambient-d.mp3",
]

const STORAGE_KEY = "ambient-audio-enabled"
const TARGET_VOLUME = 0.35

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const duckingRef = useRef(false)
  const enabledRef = useRef(false)
  const [enabled, setEnabled] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Keep ref in sync
  useEffect(() => {
    enabledRef.current = enabled
  }, [enabled])

  // Load preference on mount
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        setEnabled(true)
      }
    } catch {}
  }, [])

  // Play/pause based on enabled + ducking
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = TARGET_VOLUME
    if (enabled && !duckingRef.current) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [enabled, currentIndex])

  const duck = useCallback(() => {
    duckingRef.current = true
    if (audioRef.current) audioRef.current.pause()
  }, [])

  const resume = useCallback(() => {
    duckingRef.current = false
    if (enabledRef.current && audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }, [])

  // Attach listeners to all <video controls> elements + watch for new ones
  useEffect(() => {
    const attachTo = (video: HTMLVideoElement) => {
      if (!video.hasAttribute("controls")) return
      if (video.dataset.ambientWired === "1") return
      video.dataset.ambientWired = "1"
      video.addEventListener("play", duck)
      video.addEventListener("pause", resume)
      video.addEventListener("ended", resume)
    }

    document.querySelectorAll("video").forEach((v) => attachTo(v as HTMLVideoElement))

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLVideoElement) {
            attachTo(node)
          } else if (node instanceof HTMLElement) {
            node.querySelectorAll("video").forEach((v) => attachTo(v as HTMLVideoElement))
          }
        })
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    const onDuckEvent = () => duck()
    const onResumeEvent = () => resume()
    window.addEventListener("ambient-audio-duck", onDuckEvent)
    window.addEventListener("ambient-audio-resume", onResumeEvent)

    return () => {
      observer.disconnect()
      window.removeEventListener("ambient-audio-duck", onDuckEvent)
      window.removeEventListener("ambient-audio-resume", onResumeEvent)
    }
  }, [duck, resume])

  const handleTrackEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % TRACKS.length)
  }

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    try {
      localStorage.setItem(STORAGE_KEY, String(next))
    } catch {}
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACKS[currentIndex]}
        onEnded={handleTrackEnded}
        preload="metadata"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={enabled ? "Desligar música de fundo" : "Ligar música de fundo"}
        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-[#C9A961]/90 hover:bg-[#C9A961] backdrop-blur-sm flex items-center justify-center shadow-xl shadow-black/30 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
      >
        {enabled ? (
          <Volume2 className="w-5 h-5 text-[#1A1A1A]" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#1A1A1A]/70" />
        )}
      </button>
    </>
  )
}
