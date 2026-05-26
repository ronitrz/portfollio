import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Default values for personal profile
  name: string = 'Alex Morgan';
  headline: string = 'Creative Frontend Engineer';
  bio: string = 'Hi, I am a passionate software engineer specializing in building ultra-responsive, beautiful SPA interfaces engineered using Angular, modern glassmorphic layouts, and high-contrast light canvas designs.';
  
  // Custom Accent Brand Color
  accentColor: string = '#4f46e5'; // Default crisp Indigo
  availableColors: string[] = ['#4f46e5', '#10b981', '#f43f5e', '#f59e0b', '#3b82f6', '#0f172a'];

  // Skill Card 1
  skill1Title: string = 'Frontend Architecture';
  skill1Desc: string = 'Building state-of-the-art Single Page Applications using Angular standalone modules, reactive state management, custom routing paths, and reusable code bases.';
  
  // Skill Card 2
  skill2Title: string = 'Creative UI/UX Design';
  skill2Desc: string = 'Crafting stunning glassmorphism surfaces, tailored light/dark variables, premium high-contrast typography, and fluid micro-interactions that engage.';
  
  // Skill Card 3
  skill3Title: string = 'Performance & SEO';
  skill3Desc: string = 'Ensuring lightning-fast page loading speeds, high SEO indexing, hardware-accelerated CSS animations, clean markup structures, and responsive grid layouts.';

  // Projects Array (Dynamic data list for *ngFor & *ngIf)
  projects: any[] = [
    { id: 1, name: 'Glassmorphic Analytics Dashboard', category: 'Web', desc: 'A premium, high-contrast analytics dashboard with real-time charting and dark mode.', link: 'https://github.com' },
    { id: 2, name: 'Minimalist Portfolio Template', category: 'Design', desc: 'Clean, snow-white portfolio design optimized for frontend engineers and designers.', link: 'https://github.com' },
    { id: 3, name: 'Fitness Mobile Application', category: 'Mobile', desc: 'An intuitive native mobile app for tracking workouts, nutrition schedules, and fitness goals.', link: 'https://github.com' }
  ];

  // Form bindings for adding a new project
  newProjName: string = '';
  newProjCategory: string = 'Web';
  newProjDesc: string = '';
  newProjLink: string = 'https://github.com';

  // Active Category Filter binding
  activeFilter: string = 'All';
  categories: string[] = ['All', 'Web', 'Design', 'Mobile'];

  constructor() {
    this.loadData();
  }

  // Load portfolio details from localStorage on boot
  loadData() {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.name) this.name = data.name;
        if (data.headline) this.headline = data.headline;
        if (data.bio) this.bio = data.bio;
        if (data.skill1Title) this.skill1Title = data.skill1Title;
        if (data.skill1Desc) this.skill1Desc = data.skill1Desc;
        if (data.skill2Title) this.skill2Title = data.skill2Title;
        if (data.skill2Desc) this.skill2Desc = data.skill2Desc;
        if (data.skill3Title) this.skill3Title = data.skill3Title;
        if (data.skill3Desc) this.skill3Desc = data.skill3Desc;
        if (data.accentColor) this.accentColor = data.accentColor;
        if (data.projects) this.projects = data.projects;
      } catch (e) {
        console.error('Failed to parse saved portfolio data from localStorage', e);
      }
    }
  }

  // Save portfolio details to localStorage
  saveData() {
    const data = {
      name: this.name,
      headline: this.headline,
      bio: this.bio,
      skill1Title: this.skill1Title,
      skill1Desc: this.skill1Desc,
      skill2Title: this.skill2Title,
      skill2Desc: this.skill2Desc,
      skill3Title: this.skill3Title,
      skill3Desc: this.skill3Desc,
      accentColor: this.accentColor,
      projects: this.projects
    };
    localStorage.setItem('portfolio_data', JSON.stringify(data));
  }

  // Color Selector handler
  selectColor(color: string) {
    this.accentColor = color;
    this.saveData();
  }

  // Project Filter getter (*ngFor loop source)
  getFilteredProjects() {
    if (this.activeFilter === 'All') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.activeFilter);
  }

  // Category filter setter (*ngClass activator)
  setFilter(category: string) {
    this.activeFilter = category;
  }

  // Add new project manually
  addProject() {
    if (!this.newProjName.trim() || !this.newProjDesc.trim()) {
      alert('Please fill out the Project Name and Description!');
      return;
    }

    const nextId = this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
    const newProject = {
      id: nextId,
      name: this.newProjName,
      category: this.newProjCategory,
      desc: this.newProjDesc,
      link: this.newProjLink || 'https://github.com'
    };

    this.projects.push(newProject);
    this.saveData();

    // Reset form inputs
    this.newProjName = '';
    this.newProjDesc = '';
    this.newProjLink = 'https://github.com';
  }

  // Remove project manually
  removeProject(id: number) {
    this.projects = this.projects.filter(p => p.id !== id);
    this.saveData();
  }

  // Scroll and focus on Add Project form, presetting the category option
  scrollToAddProject() {
    if (this.activeFilter !== 'All') {
      this.newProjCategory = this.activeFilter;
    }
    
    const target = document.getElementById('proj-name-in');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Short delay to allow smooth scrolling to finish before focusing
      setTimeout(() => {
        target.focus();
      }, 350);
    }
  }
}
