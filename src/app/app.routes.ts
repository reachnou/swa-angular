import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'blog', loadChildren: () => import('./features/blog/blog.routes').then(m => m.BLOG_ROUTES) },
  { path: 'skills', loadComponent: () => import('./features/skills/skills.component').then(m => m.SkillsComponent) },
  { path: 'experience', loadComponent: () => import('./features/experience/experience.component').then(m => m.ExperienceComponent) },
  { path: 'projects', loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent) },
  { path: 'shop', loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent) },
  { path: 'education', loadComponent: () => import('./features/education/education.component').then(m => m.EducationComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent) },
  { path: 'reset-password', loadComponent: () => import('./features/auth/reset-password.component').then(m => m.ResetPasswordComponent) },
  { path: '**', redirectTo: '' }
];
