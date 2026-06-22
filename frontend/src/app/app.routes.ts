import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./pages/products/products.component').then((m) => m.ProductsComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' }
];
