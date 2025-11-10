import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// ✅ Obtener tarjetas por mazo
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const deckId = searchParams.get("deckId");

    const flashcards = await prisma.flashcard.findMany({
      where: deckId ? { deckId } : undefined,
    });

    // Si no hay tarjetas, devuelve un array vacío (evita errores .map)
    return NextResponse.json(flashcards ?? []);
  } catch (error) {
    console.error("Error en GET /flashcards:", error);
    return NextResponse.json(
      { error: "Error al obtener las tarjetas" },
      { status: 500 }
    );
  }
}

// ✅ Crear una nueva tarjeta
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { front, back, deckId } = body;

    if (!front || !back || !deckId) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const flashcard = await prisma.flashcard.create({
      data: { front, back, deckId },
    });

    return NextResponse.json(flashcard);
  } catch (error) {
    console.error("Error en POST /flashcards:", error);
    return NextResponse.json(
      { error: "Error al crear la tarjeta" },
      { status: 500 }
    );
  }
}
