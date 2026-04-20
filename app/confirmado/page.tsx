import { Suspense } from "react"
import { Hero } from "./_components/Hero"
import { Countdown } from "./_components/Countdown"
import { LevarCards } from "./_components/LevarCards"
import { CalendarButtons } from "./_components/CalendarButtons"
import { TarefaAtivacao } from "./_components/TarefaAtivacao"
import { TragaParceiro } from "./_components/TragaParceiro"
import { Depoimentos } from "./_components/Depoimentos"
import { MarinaEmMovimento } from "./_components/MarinaEmMovimento"
import { PodcastBrazillionaires } from "./_components/PodcastBrazillionaires"
import { TeaserOrigem } from "./_components/TeaserOrigem"
import { FAQ } from "./_components/FAQ"
import { Footer } from "./_components/Footer"
import { AmbientAudio } from "./_components/AmbientAudio"

export const metadata = {
  title: "Você confirmou | Dream Makers Financial",
  description: "Sua vida financeira muda aqui.",
}

export default function ConfirmadoPage() {
  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      {/* 1. Hero — needs Suspense for useSearchParams */}
      <Suspense fallback={
        <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#C9A961] border-t-transparent animate-spin" />
        </div>
      }>
        <Hero />
      </Suspense>

      {/* 2. Countdown — needs Suspense for useSearchParams */}
      <Suspense fallback={<div className="bg-[#1A1A1A] h-96" />}>
        <Countdown />
      </Suspense>

      {/* 3. O que você vai levar */}
      <LevarCards />

      {/* 4. Calendário — needs Suspense for useSearchParams */}
      <Suspense fallback={<div className="bg-[#1F3A2C] h-80" />}>
        <CalendarButtons />
      </Suspense>

      {/* 5. Tarefa de ativação */}
      <TarefaAtivacao />

      {/* 6. Traga quem decide */}
      <TragaParceiro />

      {/* 7. Depoimentos em vídeo */}
      <Depoimentos />

      {/* 7.1 Marina em movimento — reels IG */}
      <MarinaEmMovimento />

      {/* 8. Teaser origem Brazillionaires (hook de missão) */}
      <TeaserOrigem />

      {/* 8.1 Podcast Brazillionaires — mergulhe fundo */}
      <PodcastBrazillionaires />

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. Footer */}
      <Footer />

      {/* Floating ambient audio player (background music, ducks on video play) */}
      <AmbientAudio />
    </main>
  )
}
