import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Portfolio - Creative Developer' },
  { path: 'about', component: About, title: 'Portfolio - Professional Journey & Milestones' },
  { path: '**', redirectTo: '/home' }
];

