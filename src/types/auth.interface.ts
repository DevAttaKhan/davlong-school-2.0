export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProfile {
  contact_number: string;
  school_name: string;
  verified_by_admin: boolean;
  date_of_birth: string | null;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  profile: UserProfile;
  role: "admin" | "user";
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
  message: string;
}
