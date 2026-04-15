import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Isso é pirâmide tipo TelexFree?",
    a: "Não. Dream Makers Financial é agência independente licenciada pelo FL Department of Financial Services. Nossos produtos são apólices de seguradoras centenárias com 400-500% de reserva legal, regulamentadas pelo FL DFS. Comissão vem de venda real de produto regulamentado, nunca de recrutamento direto. Em pirâmide, o dinheiro vem de quem entra embaixo. Aqui, vem de família que compra proteção real.",
  },
  {
    q: "Preciso ter Green Card pra virar agente?",
    a: "Não. Aceitamos ITIN Number — milhares de brasileiros nos EUA começaram conosco sem ser cidadãos nem residentes. Você precisa ter status legal válido (Green Card, EAD, H1B, L1, O1, TN ou ITIN com visto vigente). A gente te orienta no caminho certo.",
  },
  {
    q: "Preciso investir muito dinheiro?",
    a: "$150-350 all-in pra tirar sua licença (curso + exame + fingerprint + application). Nada mais. Sem setup fee fantasma, sem 'kit inicial de $1.000' — se alguém te cobrar mais que isso, corre. No primeiro ano recuperou com a primeira venda.",
  },
  {
    q: "Vou conseguir passar na prova em inglês?",
    a: "A prova FL 2-14 Life TEM VERSÃO EM ESPANHOL — pouca gente sabe. Pass rate: 61% first-time (dado MyFloridaCFO 2021). A gente te dá plano de estudos em português e simulados em espanhol. Levar 60-90 dias é normal.",
  },
  {
    q: "Quanto tempo até primeira comissão?",
    a: "Sendo honesta: 60-90 dias após licença em mão. Os primeiros 3-6 meses são difíceis — o mercado chama de 'Death Valley'. 90% desiste nesse período. Os 10% que seguem o sistema chegam a $60k-$100k no primeiro ano. Não vou te prometer que VOCÊ vai estar nos 10% — isso é decisão diária sua.",
  },
]

export function FAQ() {
  return (
    <section className="bg-[#1A1A1A] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#C9A961] text-sm tracking-[0.3em] uppercase font-semibold">
            Perguntas honestas
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl text-white font-bold mt-3">
            Respostas diretas
          </h2>
          <p className="text-white/50 mt-3 text-sm">
            Sem eufemismo. Sem esconder o difícil.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-0">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
              <AccordionTrigger className="text-white hover:text-[#C9A961] text-left text-base font-medium py-5 no-underline hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/65 text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
