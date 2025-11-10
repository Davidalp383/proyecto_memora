import { NextResponse } from "next/server";
import sql from "../../../db";

// Obtener tarjetas por mazo
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const deckId = searchParams.get("deckId");

    const flashcards = await sql`
      SELECT *
      FROM "flashcards"
      ${deckId ? sql`WHERE deck_id=${deckId}` : sql``}
      ORDER BY id
    `;

    return NextResponse.json(flashcards ?? []);
  } catch (err: any) {
    console.error("❌ Error en GET /flashcards:", err);
    return NextResponse.json({ error: "Error al obtener las tarjetas" }, { status: 500 });
  }
}

// Crear una nueva tarjeta
export async function POST(req: Request) {
  try {
    const { front, back, deckId } = await req.json();

    if (!front || !back || !deckId) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const [flashcard] = await sql`
      INSERT INTO "flashcards" (front, back, deck_id)
      VALUES (${front}, ${back}, ${deckId})
      RETURNING *
    `;

    return NextResponse.json(flashcard);
  } catch (err: any) {
    console.error("❌ Error en POST /flashcards:", err);
    return NextResponse.json({ error: "Error al crear la tarjeta" }, { status: 500 });
  }
}
