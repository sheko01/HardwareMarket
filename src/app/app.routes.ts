import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () => import('./components/search/search').then((m) => m.SearchComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart').then((m) => m.CartComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./components/product-detail/product-detail').then((m) => m.ProductDetailComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard').then((m) => m.DashboardComponent),
    canActivate: [adminGuard],
  },
  { path: '**', redirectTo: '' },
];
