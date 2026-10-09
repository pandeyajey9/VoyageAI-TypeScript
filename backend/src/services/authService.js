import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

import {
  findUserByEmail,
  createUser,
  findUserById,
} from "../repositories/userRepository.js";

export const signupUser = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  return {
    message: "User created Successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  return {
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

export const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
