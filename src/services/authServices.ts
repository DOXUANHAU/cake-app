import { StoredUser } from "@/types/models/userModel";
import { RegisterUserDto } from "../dto/register/users";
import { users } from "@/data/uesrs";
import { LoginPayload } from "@/types";

export const authRegister = {
  register: async (data: RegisterUserDto) => {
    // logic to register user
    // check user has already existed
    const existingUser = users.find((user) => user.email === data.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // create new user
    const newUser: StoredUser = {
      id: users.length + 1 + "",
      name: data.name,
      email: data.email,
      password: data.password, // In real application, password should be hashed
      role: "user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // save user to database (here we just push to the array)
    users.push(newUser);

    return newUser;
  },
};

export const authLogin = {
  login: async (data: LoginPayload) => {
    // logic to login user
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password,
    );
    if (!user) {
      throw new Error("User not found or incorrect password");
    }
    return user;
  },
};
