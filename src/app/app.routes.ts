import { Routes } from '@angular/router';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: MsalRedirectComponent,
  },
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./profile/profile.page').then(m => m.ProfilePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
   
  {
    path: 'catalog',
    loadComponent: () => import('./catalog/catalog.page').then( m => m.CatalogPage)
  },  {
    path: 'aboutus',
    loadComponent: () => import('./aboutus/aboutus.page').then( m => m.AboutusPage)
  },


  

];
