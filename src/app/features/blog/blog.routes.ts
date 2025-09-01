import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./list/blog-list.component').then(m => m.BlogListComponent) },
  { path: 'new', loadComponent: () => import('./editor/blog-editor.component').then(m => m.BlogEditorComponent) },
  { path: ':slug', loadComponent: () => import('./detail/blog-detail.component').then(m => m.BlogDetailComponent) },
];
