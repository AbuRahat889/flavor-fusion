import { db } from "../config/db";

export interface IActivityLog {
  id?: number;
  userId?: string;
  action: string;
  meta?: Record<string, unknown>;
  created_at?: Date;
}

export const createActivityLog = async (data: IActivityLog) => {
  const query = `
    INSERT INTO activity_logs (user_id, action, meta)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [
    data.userId,
    data.action,
    data.meta ? JSON.stringify(data.meta) : null,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};
