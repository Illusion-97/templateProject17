import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'login', loadComponent: () => import('../components/login/login.component').then(m => m.LoginComponent)}, 
    {path: 'register', loadComponent: () => import('../components/register/register.component').then(m => m.RegisterComponent)},
    // Le path:'**' se met toujours en dernier, pour récupérer tout ce qui n'est pas défini plus haut
    {path: '**', redirectTo: 'login', pathMatch: 'prefix'} 
];
