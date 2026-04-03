import { RegisterUserDto } from "../dto/register/users";
import { StoredUser, users } from "@/data/uesrs";

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
