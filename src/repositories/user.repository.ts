import { prisma } from "../config/prisma";
import { Role } from "@prisma/client";

export const userRepository = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  create: (data: { email: string; password: string; name: string; role?: Role }) =>
    prisma.user.create({ data }),
};
