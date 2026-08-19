import UserModel from "@models/user.model.js";
import type { UserInput } from "src/types.js";

export async function createUser(input: UserInput) {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
