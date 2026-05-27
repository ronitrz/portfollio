import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { ResumeBuilder } from './resume/resume';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Portfolio - Creative Developer' },
  { path: 'about', component: About, title: 'Portfolio - Professional Journey & Milestones' },
  { path: 'resume', component: ResumeBuilder, title: 'Portfolio - Interactive Resume Engine' },
  { path: '**', redirectTo: '/home' }
];

