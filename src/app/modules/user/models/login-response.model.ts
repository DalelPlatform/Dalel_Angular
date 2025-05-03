export interface LoginResponse {
    Success: boolean;
    Message: string;
    token?: string;
    role?: string;
  }