import bcrypt from "bcrypt";
import * as authRepository from "../repositores/auth-repository.js";
import type { LoginData, RegisterData } from "../schemas/auth-schema.js";

export async function register(userData: RegisterData) {
  const userExists = await authRepository.findUserByEmail(userData.email);

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await authRepository.createUser(
    userData.name,
    userData.email,
    hashedPassword,
  );

  return newUser;
}

export async function login(credentials: LoginData) {
  const user = await authRepository.findUserByEmail(credentials.email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(credentials.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
}

