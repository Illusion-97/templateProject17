import { Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { articleResolver } from '../views/article-editor/article-editor.component';
import { authGuard } from '../services/auth.service';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'auth',
      loadChildren: () => import('../auth/auth.routes').then(m => m.routes)
    },
    {
      path: 'editor/:id', // path: ':name' -> name deviens une variable dans l'URL
      loadComponent: () => import('../views/article-editor/article-editor.component').then(m => m.ArticleEditorComponent),
      canActivate: [authGuard],
      resolve: {
        article : articleResolver
      }
    },
    {
      path: '**',
      redirectTo: '/',
      pathMatch: "full"
    }
];
