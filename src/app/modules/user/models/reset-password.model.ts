export interface ResetPasswordRequest {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface ResetPasswordResponse {
    Success: boolean;
    Message: string;
    Status?: number;
  }
  