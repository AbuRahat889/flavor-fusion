import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { env } from "../config/env";

/**
 * Idempotently ensures a default ADMIN user exists.
 * Runs automatically on server boot, and can also be invoked via `npm run seed`.
 */
export const ensureDefaultAdmin = async (): Promise<void> => {
  const { email, password, name } = env.defaultAdmin;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      if (existing.role !== "ADMIN") {
        await prisma.user.update({ where: { email }, data: { role: "ADMIN" } });
        console.log(`[seed] promoted ${email} to ADMIN`);
      } else {
        console.log(`[seed] default admin already exists: ${email}`);
      }
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hash, name, role: "ADMIN" },
    });
    console.log(`[seed] created default admin → ${email} / ${password}`);
  } catch (e) {
    console.warn("[seed] skipped (DB not ready?)", (e as Error).message);
  }
};

if (require.main === module) {
  ensureDefaultAdmin().finally(() => process.exit(0));
}
