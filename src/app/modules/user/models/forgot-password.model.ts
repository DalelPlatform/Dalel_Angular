export interface ForgotPasswordRequest {
    email: string;
  }
  
  export interface ForgotPasswordResponse {
    Success: boolean;
    Message: string;
    Token?: string;
    Status?: number;
  }
  