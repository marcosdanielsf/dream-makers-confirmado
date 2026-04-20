import { NextResponse } from "next/server"

/**
 * Endpoint de redirect: /r?c={{contact.id}}
 *
 * Problema que resolve: WhatsApp corta URLs no primeiro espaco. Merge fields
 * GHL como {{appointment.start_time}} retornam "Monday, April 20, 2026 10:59 AM"
 * (com espacos) — o link clicavel fica truncado em "...&d=Monday,".
 *
 * Solucao: GHL envia o link curto "/r?c=CONTACT_ID" (zero espaco). Server
 * consulta GHL API, pega startTime real do proximo appointment, redireciona
 * para /confirmado?n=NOME&d=ISO. ISO nao tem espaco, sobrevive o WhatsApp.
 */

const LP_BASE = "https://dreammakersfinancial.socialfy.me/confirmado"
const GHL_BASE = "https://services.leadconnectorhq.com"
const GHL_PIT = process.env.GHL_PIT_MARINA || ""

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type GhlContact = { firstName?: string; lastName?: string }
type GhlEvent = { startTime?: string; deleted?: boolean }

function buildFallback(origin: string, firstName?: string) {
  const url = new URL("/confirmado", origin)
  if (firstName) url.searchParams.set("n", firstName)
  return NextResponse.redirect(url, 302)
}

function buildTarget(origin: string, firstName?: string, startTimeRaw?: string) {
  const url = new URL("/confirmado", origin)
  if (firstName) url.searchParams.set("n", firstName)
  if (startTimeRaw) {
    // GHL retorna "2026-04-20 20:00:00" (sem TZ, com espaco). parseCallDate
    // do cliente aceita "2026-04-20T20:00:00" e assume EDT (fuso Marina).
    const iso = startTimeRaw.replace(" ", "T")
    url.searchParams.set("d", iso)
  }
  return NextResponse.redirect(url, 302)
}

export async function GET(req: Request) {
  const reqUrl = new URL(req.url)
  const origin = reqUrl.origin
  const contactId = reqUrl.searchParams.get("c")

  if (!contactId || !GHL_PIT) {
    return NextResponse.redirect(LP_BASE, 302)
  }

  const authHeader = { Authorization: `Bearer ${GHL_PIT}`, Accept: "application/json" } as const

  try {
    const [contactRes, apptsRes] = await Promise.all([
      fetch(`${GHL_BASE}/contacts/${contactId}`, {
        headers: { ...authHeader, Version: "2021-07-28" },
        cache: "no-store",
      }),
      fetch(`${GHL_BASE}/contacts/${contactId}/appointments`, {
        headers: { ...authHeader, Version: "2021-04-15" },
        cache: "no-store",
      }),
    ])

    const contactJson: { contact?: GhlContact } = contactRes.ok ? await contactRes.json() : {}
    const apptsJson: { events?: GhlEvent[] } = apptsRes.ok ? await apptsRes.json() : {}

    const firstName = contactJson.contact?.firstName?.trim() || undefined
    const events = (apptsJson.events || []).filter((e) => !e.deleted && e.startTime)

    if (events.length === 0) {
      return buildFallback(origin, firstName)
    }

    const now = Date.now()
    const upcoming = events
      .map((e) => ({ ...e, _t: new Date((e.startTime || "").replace(" ", "T") + "-04:00").getTime() }))
      .filter((e) => !isNaN(e._t) && e._t >= now - 60 * 60 * 1000)
      .sort((a, b) => a._t - b._t)[0]

    const chosen = upcoming || events.sort(
      (a, b) => new Date((b.startTime || "").replace(" ", "T")).getTime() -
                new Date((a.startTime || "").replace(" ", "T")).getTime()
    )[0]

    return buildTarget(origin, firstName, chosen.startTime)
  } catch {
    return NextResponse.redirect(LP_BASE, 302)
  }
}
