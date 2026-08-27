import mongoose from 'mongoose';
import type { Session } from '../types.ts';

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }, //store user browser
  },
  {
    // createdAt → when the session document was first created.
    // updatedAt → when the session document was last modified.
    timestamps: true, //automatically adds createdAt, updatedAt
  }
);

const SessionModel = mongoose.model<Session>('Session', sessionSchema);

export default SessionModel;
