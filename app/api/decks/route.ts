import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// Obtener todos los mazos
export async function GET() {
  try {
    const decks = await prisma.deck.findMany({ include: { flashcards: true } });
    return NextResponse.json(decks);
  } catch (err) {
    console.error("Error al obtener mazos:", err);
    return NextResponse.json({ error: "No se pudieron obtener los mazos." }, { status: 500 });
  }
}

// Crear un mazo nuevo
export async function POST(req: Request) {
  try {
    const { name, description, userId, userName } = await req.json();

    if (!name || !userId) {
      return NextResponse.json({ error: "Faltan datos obligatorios." }, { status: 400 });
    }

    // Crear usuario si no existe
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      // email obligatorio, usamos un valor dummy basado en el UUID
      user = await prisma.user.create({
        data: {
          id: userId,
          name: userName || "Usuario Local",
          email: `${userId}@local.com`,
        },
      });
    }

    // Crear mazo
    const deck = await prisma.deck.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return NextResponse.json(deck);
  } catch (err) {
    console.error("Error creando mazo:", err);
    return NextResponse.json({ error: "No se pudo crear el mazo." }, { status: 500 });
  }
}
