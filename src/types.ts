import type mongoose from "mongoose";

interface UserInput {
  email: string;
  name: string;
  password: string;
}

interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

interface Session extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Product extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
  createAt: Date;
  updatedAt: Date;
}

export type { UserInput, UserDocument, Session, Product };
