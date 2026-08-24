import UserModel from "@models/user.model.js";
import type { UserDocument, UserInput } from "src/types.js";

const createUser = async (input: UserInput) => {
  try {
    const user = await UserModel.create(input);
    const { password, ...newUser } = user.toObject();
    return newUser;
  } catch (e: any) {
    throw new Error(e);
  }
};

const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;
  const { password: psw, ...newUser } = user.toObject();

  return newUser;
};

const findUser = async (query: Partial<UserDocument>) => {
  return UserModel.findOne(query).lean();
};

export { createUser, validatePassword, findUser };
