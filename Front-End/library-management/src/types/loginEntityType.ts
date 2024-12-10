export interface LoginRequestEntityType {
  email: string;
  password: string;
}
export interface LoginResponseEntityType {
  token: string;
  role: string;
  email: string;
}
