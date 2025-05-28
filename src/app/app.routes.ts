import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
];
