export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  email: string;
  password: string;
}
export interface ProfileRequest {
  name: string;
  location: string;
  website: string;
}
export interface ForgotRequest {
  email: string;
}
export interface PasswordChangeRequest {
  password: string;
  confirm: string;
}
export interface SuccessResponse {
  success: boolean;
}