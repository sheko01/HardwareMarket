import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal<boolean>(localStorage.getItem('theme') === 'dark');

  constructor() {
    // Apply saved theme on startup
    this._applyTheme(this.isDark());

    // React to every change automatically
    effect(() => {
      const dark = this.isDark();
      this._applyTheme(dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  toggle() {
    this.isDark.update((v) => !v);
  }

  private _applyTheme(dark: boolean) {
    if (dark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
