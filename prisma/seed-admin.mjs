import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "superadmin";
  const password = "Admin2026";
  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashed,
      role: "SUPER_ADMIN",
      name: "Super Admin",
    },
    create: {
      email,
      password: hashed,
      role: "SUPER_ADMIN",
      name: "Super Admin",
    },
  });

  console.log("✅ SUPER_ADMIN user ready:", user.email, "role:", user.role);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
