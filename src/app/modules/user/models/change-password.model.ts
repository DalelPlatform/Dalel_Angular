export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface ChangePasswordResponse {
    Success: boolean;
    Message: string;
    Status?: number;
  }
  