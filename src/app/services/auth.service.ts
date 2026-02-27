import { Injectable, signal, computed } from '@angular/core';
import { IUser, IAuthState, UserRole } from '../models/user';

const USERS: IUser[] = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user', name: 'John Doe' },
];

const AUTH_KEY = 'hw_auth';

function loadSaved(): IAuthState {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) return JSON.parse(raw) as IAuthState;
  } catch {}
  return { user: null, isLoggedIn: false };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _state = signal<IAuthState>(loadSaved());

  readonly authState = this._state.asReadonly();
  readonly isLoggedIn = computed(() => this._state().isLoggedIn);
  readonly currentUser = computed(() => this._state().user);
  readonly isAdmin = computed(() => this._state().user?.role === 'admin');

  login(username: string, password: string): boolean {
    const found = USERS.find((u) => u.username === username && u.password === password);
    if (!found) return false;

    const state: IAuthState = {
      isLoggedIn: true,
      user: { id: found.id, username: found.username, role: found.role, name: found.name },
    };
    this._state.set(state);
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
    return true;
  }

  logout() {
    const state: IAuthState = { user: null, isLoggedIn: false };
    this._state.set(state);
    localStorage.removeItem(AUTH_KEY);
  }
}
