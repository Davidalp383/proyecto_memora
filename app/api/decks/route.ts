import { NextResponse } from "next/server";
import sql from "../../../db";

// Obtener todos los mazos
export async function GET() {
  try {
    const decks = await sql`
      SELECT d.*, COUNT(f.id) AS "cardCount"
      FROM "decks" d
      LEFT JOIN "flashcards" f ON f.deck_id = d.id
      GROUP BY d.id
      ORDER BY d.name
    `;
    return NextResponse.json(decks);
  } catch (err: any) {
    console.error("❌ Error al obtener mazos:", err);
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
    const existingUser = await sql`SELECT * FROM "users" WHERE id=${userId}`;
    if (existingUser.length === 0) {
      await sql`
        INSERT INTO "users" (id, name, email)
        VALUES (${userId}, ${userName || "Usuario Local"}, ${userId + "@local.com"})
      `;
    }

    // Crear mazo
    const [deck] = await sql`
      INSERT INTO "decks" (name, description, user_id)
      VALUES (${name}, ${description || null}, ${userId})
      RETURNING *
    `;

    return NextResponse.json(deck);
  } catch (err: any) {
    console.error("❌ Error creando mazo:", err);
    return NextResponse.json({ error: "No se pudo crear el mazo." }, { status: 500 });
  }
}
