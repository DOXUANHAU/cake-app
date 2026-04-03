export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export const users: StoredUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password456",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "password789",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    password: "password012",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
