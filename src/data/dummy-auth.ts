import type { User } from "@/types/auth.interface";

/**
 * Dummy credentials for development/demo.
 * Replace with real API auth in production.
 */
export const DUMMY_CREDENTIALS = {
  admin: {
    email: "admin@davelongcoachtravel.ie",
    password: "Admin@123",
  },
  user: {
    email: "user@davelongcoachtravel.ie",
    password: "User@123",
  },
} as const;

export function getDummyUserByRole(role: "admin" | "user"): User {
  const creds =
    role === "admin" ? DUMMY_CREDENTIALS.admin : DUMMY_CREDENTIALS.user;
  return {
    id: role === "admin" ? 1 : 2,
    email: creds.email,
    username: creds.email.split("@")[0],
    role,
    operator_id: role === "admin" ? 0 : 1,
    status: "active",
    fullname: role === "admin" ? "Admin User" : "User",
    created_at: new Date().toISOString(),
    updated_at: null,
  };
}

export function validateDummyLogin(
  email: string,
  password: string
): "admin" | "user" | null {
  const e = email.trim().toLowerCase();
  const p = password;
  if (
    e === DUMMY_CREDENTIALS.admin.email &&
    p === DUMMY_CREDENTIALS.admin.password
  ) {
    return "admin";
  }
  if (
    e === DUMMY_CREDENTIALS.user.email &&
    p === DUMMY_CREDENTIALS.user.password
  ) {
    return "user";
  }
  return null;
}
