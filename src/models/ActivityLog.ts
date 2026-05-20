import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";

export interface IActivityLog {
  userId?: string;
  action: string;
  meta?: Prisma.InputJsonValue;
}

export const createActivityLog = async (data: IActivityLog) => {
  return prisma.activityLog.create({
    data: {
      userId: data.userId,
      action: data.action,
      meta: data.meta,
    },
  });
};
