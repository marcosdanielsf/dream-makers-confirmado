import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Stub — n8n webhook liga aqui depois
    console.log("[dream-makers/tarefa]", JSON.stringify(body))
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 })
  }
}
