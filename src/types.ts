import type mongoose from "mongoose";

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

// export interface UserDocument extends mongoose.Document {
//   email: string;
//   name: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
//   //   comparePassword(candidatePassword: String): Promise<boolean>;
// }
