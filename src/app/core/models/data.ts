export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData {
  email: string;
  password: string;
}
export interface ProfileData {
  name: string;
  location: string;
  website: string;
}
export interface PasswordChangeData {
  password: string;
  confirm: string;
}
export interface SuccessResponse {
  success: boolean;
}