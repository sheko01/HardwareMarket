export type UserRole = 'admin' | 'user';

export interface IUser {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

export interface IAuthState {
  user: Omit<IUser, 'password'> | null;
  isLoggedIn: boolean;
}
