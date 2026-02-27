import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  username = '';
  password = '';
  error = signal('');
  loading = signal(false);

  onSubmit() {
    this.error.set('');
    if (!this.username || !this.password) {
      this.error.set('Please fill in all fields.');
      return;
    }
    this.loading.set(true);
    const ok = this.auth.login(this.username, this.password);
    this.loading.set(false);

    if (!ok) {
      this.error.set('Invalid username or password.');
      return;
    }

    const redirect = this.route.snapshot.queryParams['redirect'] ?? '/';
    this.router.navigateByUrl(redirect);
  }

  fillAdmin() {
    this.username = 'admin';
    this.password = 'admin123';
  }

  fillUser() {
    this.username = 'user';
    this.password = 'user123';
  }
}
