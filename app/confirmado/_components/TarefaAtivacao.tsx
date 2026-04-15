"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const PLACEHOLDERS = [
  "O que você mais quer resolver?",
  "Qual sua maior dúvida sobre essa carreira?",
  "Onde você quer estar em 5 anos?",
]

const LS_KEY = "dream-makers-tarefa"

export function TarefaAtivacao() {
  const [value, setValue] = useState("")
  const [saved, setSaved] = useState(false)
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0])
  const rotateRef = useRef<NodeJS.Timeout | null>(null)
  const idxRef = useRef(0)

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY)
    if (stored) {
      setValue(stored)
      setSaved(true)
    }

    rotateRef.current = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % PLACEHOLDERS.length
      setPlaceholder(PLACEHOLDERS[idxRef.current])
    }, 3000)

    return () => {
      if (rotateRef.current) clearInterval(rotateRef.current)
    }
  }, [])

  const handleSave = async () => {
    if (!value.trim()) return

    localStorage.setItem(LS_KEY, value)
    setSaved(true)

    // Stub POST
    try {
      await fetch("/api/tarefa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tarefa: value, timestamp: new Date().toISOString() }),
      })
    } catch {
      // silencioso — n8n ainda não conectado
    }

    toast({
      variant: "success",
      title: "Pronto. Anotado.",
      description: "Salvamos aqui e no seu perfil.",
    })
  }

  return (
    <section className="bg-[#1A1A1A] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#C9A961] text-sm tracking-[0.3em] uppercase font-semibold">
            Ativação
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl text-white font-bold mt-3 mb-4">
            Quem prepara, aproveita 10x mais.
          </h2>
          <p className="text-white/60 text-base max-w-md mx-auto">
            Anota aqui o que você quer ouvir quinta. Isso direciona a call pra sua realidade.
          </p>
        </div>

        <div className="bg-[#1F3A2C] border border-[#C9A961]/20 rounded-2xl p-6 sm:p-8">
          <Textarea
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setSaved(false)
            }}
            placeholder={placeholder}
            rows={4}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#C9A961] resize-none text-base"
          />

          <div className="flex items-center justify-between mt-4">
            <span className="text-white/30 text-xs">
              {value.length} caracteres
            </span>
            <Button
              onClick={handleSave}
              disabled={!value.trim()}
              variant="gold"
              size="lg"
              className="min-w-[120px]"
            >
              {saved ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Salvo
                </span>
              ) : (
                "Salvar"
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
