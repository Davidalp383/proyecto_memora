import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@memora.com" },
    update: {},
    create: {
      name: "Usuario Demo",
      email: "demo@memora.com",
    },
  });

  console.log("Usuario creado:", user);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
