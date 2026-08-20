import mongoose from "mongoose";
import type { Session } from "src/types.js";

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }, //store user browser
  },
  {
    timestamps: true,
  },
);

const SessionModel = mongoose.model<Session>("Session", sessionSchema);

export default SessionModel;
