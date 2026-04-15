import { MessageCircle, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/5 py-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Logo placeholder */}
        <div className="flex justify-center mb-6">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Dream Makers Financial"
          >
            <polygon
              points="24,4 44,14 44,34 24,44 4,34 4,14"
              stroke="#C9A961"
              strokeWidth="1.5"
              fill="none"
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#C9A961"
              fontSize="14"
              fontFamily="serif"
              fontWeight="bold"
            >
              DM
            </text>
          </svg>
        </div>

        <p className="text-[#C9A961] font-playfair text-lg font-semibold mb-1">
          Dream Makers Financial
        </p>
        <p className="text-white/40 text-sm mb-8">Boca Raton, FL</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="mailto:contato@dreammakersfinancial.com"
            className="flex items-center gap-2 text-white/50 hover:text-[#C9A961] text-sm transition-colors"
          >
            <Mail className="w-4 h-4" />
            Preciso reagendar
          </a>
          <span className="hidden sm:block text-white/20">·</span>
          <a
            href="https://wa.me/15614000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 hover:text-[#C9A961] text-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Marina
          </a>
        </div>

        <div className="border-t border-white/5 pt-6">
          <p className="text-white/25 text-xs leading-relaxed max-w-2xl mx-auto">
            Produtos de seguro de vida oferecidos por agentes licenciados pelo Florida Department of Financial Services.
            Seguros de vida e anuidades são produtos regulamentados e não garantem retorno de investimento.
            Resultados individuais variam. Comissões são pagas por seguradoras regulamentadas mediante venda de apólices válidas.
          </p>
          <p className="text-white/30 text-xs mt-4">
            © 2026 Dream Makers Financial · Boca Raton, FL
          </p>
        </div>
      </div>
    </footer>
  )
}
