import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Unwrap de params según Next.js 16+ con Turbopack
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Mazo no encontrado" },
        { status: 400 }
      );
    }

    // 1️⃣ Borrar todas las flashcards asociadas al mazo
    await prisma.flashcard.deleteMany({ where: { deckId: id } });

    // 2️⃣ Borrar el mazo
    await prisma.deck.delete({ where: { id } });

    return NextResponse.json({ message: "Mazo eliminado" }, { status: 200 });
  } catch (err) {
    console.error("Error eliminando mazo:", err);
    return NextResponse.json(
      { message: "Error eliminando mazo", error: err },
      { status: 500 }
    );
  }
}