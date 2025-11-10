import { NextResponse } from "next/server";
import sql from "../../../db";

// Obtener tarjetas por mazo
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const deckId = searchParams.get("deckId");

    const flashcards = await sql`SELECT * FROM flashcard
                                 ${deckId ? sql`WHERE deck_id=${deckId}` : sql``}`;

    // Evita errores de .map si no hay tarjetas
    return NextResponse.json(flashcards ?? []);
  } catch (err) {
    console.error("Error en GET /flashcards:", err);
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

    const [flashcard] = await sql`INSERT INTO flashcard (front, back, deck_id)
                                   VALUES (${front}, ${back}, ${deckId})
                                   RETURNING *`;

    return NextResponse.json(flashcard);
  } catch (err) {
    console.error("Error en POST /flashcards:", err);
    return NextResponse.json({ error: "Error al crear la tarjeta" }, { status: 500 });
  }
}
