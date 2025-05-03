export interface User {
    userName: string;
    email: string;
    nationalId: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    role: string;
    categoryServicesId?: number;
  }