import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// Registrar un repaso de tarjeta
export async function POST(req: Request) {
  const { flashcardId, userId, remembered } = await req.json();
  const review = await prisma.review.create({
    data: { flashcardId, userId, remembered },
  });
  return NextResponse.json(review);
}
