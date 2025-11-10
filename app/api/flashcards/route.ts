import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// Obtener tarjetas por mazo
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const deckId = searchParams.get("deckId");
  const flashcards = await prisma.flashcard.findMany({
    where: { deckId: deckId || undefined },
  });
  return NextResponse.json(flashcards);
}

// Crear una nueva tarjeta
export async function POST(req: Request) {
  const { front, back, deckId } = await req.json();
  const flashcard = await prisma.flashcard.create({
    data: { front, back, deckId },
  });
  return NextResponse.json(flashcard);
}
