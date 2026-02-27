import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  auth = inject(AuthService);
  theme = inject(ThemeService);
  cart = inject(CartService);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
