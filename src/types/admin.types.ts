export type AdminRole = 'SUPER_ADMIN' | 'MODERATOR';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  token: string | null;
}
// Données envoyées au backend lors du login
export interface AdminLoginPayload {
  email: string;
  password: string;
}

// Données envoyées pour valider le code OTP
export interface OtpPayload {
  email: string;
  otp: string;
}