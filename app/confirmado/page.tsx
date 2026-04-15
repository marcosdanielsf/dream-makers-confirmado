import { Suspense } from "react"
import { Hero } from "./_components/Hero"
import { Countdown } from "./_components/Countdown"
import { LevarCards } from "./_components/LevarCards"
import { CalendarButtons } from "./_components/CalendarButtons"
import { TarefaAtivacao } from "./_components/TarefaAtivacao"
import { TragaParceiro } from "./_components/TragaParceiro"
import { Depoimentos } from "./_components/Depoimentos"
import { Teaser401k } from "./_components/Teaser401k"
import { FAQ } from "./_components/FAQ"
import { Footer } from "./_components/Footer"

export const metadata = {
  title: "Você confirmou | Dream Makers Financial",
  description: "Quinta, 20h EDT. Sua vida financeira muda aqui.",
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

      {/* 2. Countdown */}
      <Countdown />

      {/* 3. O que você vai levar */}
      <LevarCards />

      {/* 4. Calendário */}
      <CalendarButtons />

      {/* 5. Tarefa de ativação */}
      <TarefaAtivacao />

      {/* 6. Traga quem decide */}
      <TragaParceiro />

      {/* 7. Depoimentos em vídeo */}
      <Depoimentos />

      {/* 8. Teaser 401k */}
      <Teaser401k />

      {/* 9. FAQ */}
      <FAQ />

      {/* 10. Footer */}
      <Footer />
    </main>
  )
}
