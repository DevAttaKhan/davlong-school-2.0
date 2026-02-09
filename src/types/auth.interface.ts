export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  email: string;
  id: number;
  role: "admin" | "user";
  operator_id: number;
  username: string;
  status: string;
  fullname: string;
  created_at: string;
  updated_at: string | null;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}
