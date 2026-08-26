import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config.js";
import type { UserDocument } from "../types.js";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const user = this as unknown as UserDocument;

  if (!user.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(config.saltWorkFactor);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
