import type { Metadata } from "next"
import { Inter, Playfair_Display, DM_Serif_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Você confirmou | Dream Makers Financial",
  description: "Você está a um passo de transformar sua carreira financeira nos EUA. Quinta, 20h EDT.",
  openGraph: {
    title: "Você confirmou | Dream Makers Financial",
    description: "Quinta, 20h EDT. Sua vida financeira muda aqui.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} ${dmSerif.variable}`}>
      <body className="font-[var(--font-inter)] antialiased bg-[#1A1A1A] text-white">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
