import { FileText, Users, BookOpen } from "lucide-react"

const cards = [
  {
    icon: FileText,
    title: "Blueprint Financeiro Personalizado",
    description:
      "PDF individual em 48h, feito pra VOCÊ pelo time Dream Makers. 20 anos da sua vida financeira mapeados.",
    badge: "EXCLUSIVO",
  },
  {
    icon: Users,
    title: "Acesso 30 dias Brazillionaires Carreira VIP",
    description:
      "Grupo fechado onde brasileiros(as) que já estão vivendo essa transição compartilham o dia-a-dia.",
    badge: "COMUNIDADE",
  },
  {
    icon: BookOpen,
    title: "Guia Completo Licenciamento 2-15 FL em PT-BR",
    description:
      "Cronograma 60 dias, prova em espanhol, custos reais, FAQ honesto. Sem pegadinha.",
    badge: "GUIA",
  },
]

export function LevarCards() {
  return (
    <section id="levar" className="bg-[#FAF7F0] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#1F3A2C] text-sm tracking-[0.3em] uppercase font-semibold">
            Seus presentes de confirmação
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] mt-3 font-bold">
            O que você vai levar
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-7 shadow-sm border border-[#C9A961]/20 hover:shadow-md hover:border-[#C9A961]/50 transition-all group"
              >
                <span className="absolute top-4 right-4 text-[10px] tracking-widest font-bold text-[#C9A961] bg-[#C9A961]/10 px-2 py-0.5 rounded-full">
                  {card.badge}
                </span>
                <div className="w-12 h-12 rounded-xl bg-[#1F3A2C] flex items-center justify-center mb-5 group-hover:bg-[#C9A961] transition-colors">
                  <Icon className="w-5 h-5 text-[#C9A961] group-hover:text-[#1A1A1A] transition-colors" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-3 leading-snug">
                  {card.title}
                </h3>
                <p className="text-[#1A1A1A]/60 text-sm leading-relaxed">{card.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[#1A1A1A] font-semibold text-lg bg-[#C9A961]/15 border border-[#C9A961]/30 rounded-xl px-6 py-4 inline-block">
            Mas você só leva se ficar até o final.
          </p>
        </div>
      </div>
    </section>
  )
}
