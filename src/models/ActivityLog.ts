import { Schema, model, Document } from "mongoose";

export interface IActivityLog extends Document {
  userId?: string;
  action: string;
  meta?: Record<string, unknown>;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    userId: { type: String },
    action: { type: String, required: true },
    meta: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const ActivityLog = model<IActivityLog>(
  "ActivityLog",
  ActivityLogSchema,
);
