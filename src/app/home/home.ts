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

  // NEW PROFILE SECTION DETAILS
  avatarUrl: string = 'profile.jpg';
  email: string = 'alex@morgan.dev';
  phone: string = '+1 (555) 019-2834';
  location: string = 'San Francisco, CA';

  githubUrl: string = 'https://github.com';
  linkedinUrl: string = 'https://linkedin.com';

  // Dynamic Education Details
  educationList: any[] = [
    { school: 'Stanford University', degree: 'Bachelor of Science in Computer Science', duration: '2018 - 2022', cgpa: '3.91/4.0', summary: 'Graduated with Honors. Specialization in Human-Computer Interaction and Client-Side Web Architecture.' }
  ];
  newEduSchool: string = '';
  newEduDegree: string = '';
  newEduDuration: string = '';
  newEduCgpa: string = '';
  newEduSummary: string = '';

  experience: number = 3;
  projectsCount: number = 18;
  clientsCount: number = 12;

  // Custom Accent Brand Color
  accentColor: string = '#4f46e5'; // Default crisp Indigo
  availableColors: string[] = ['#4f46e5', '#10b981', '#f43f5e', '#f59e0b', '#3b82f6', '#0f172a'];

  // Legacy fields declared for compile safety
  skill1Title: string = 'Frontend Architecture';
  skill1Desc: string = 'Building single page standalone applications.';
  skill2Title: string = 'Creative UI/UX Design';
  skill2Desc: string = 'Crafting gorgeous glassmorphism overlays and dynamic customizers.';
  skill3Title: string = 'Performance & SEO';
  skill3Desc: string = 'Optimizing bundle sizes and tab title updates.';

  // Dynamic Work Experience items
  workExperiences: any[] = [
    { company: 'TechCorp Solutions', role: 'Senior Frontend Architect', duration: '2024 - Present', summary: 'Designed and deployed advanced client-side micro-frontends using Angular standalone modular shells.' },
    { company: 'Innovate Design', role: 'UI Engineer', duration: '2022 - 2024', summary: 'Crafted pixel-perfect layout customizers, tailored glassmorphism variables, and responsive timeline widgets.' }
  ];
  newWorkCompany: string = '';
  newWorkRole: string = '';
  newWorkDuration: string = '';
  newWorkSummary: string = '';

  // Dynamic Testimonials
  testimonials: any[] = [
    { author: 'Emily Stone', designation: 'Director of Products at Innovate', text: 'Alex Morgan is an exceptional frontend developer. His glassmorphism aesthetics and pixel-perfect responsiveness saved our team months of UI redesign work!' },
    { author: 'Marcus Vance', designation: 'CTO at TechScale Inc.', text: 'The cleanest codebase we have integrated. Absolute outstanding mastery of single page client frameworks and dynamic customizer variables!' }
  ];
  newTestiAuthor: string = '';
  newTestiDesignation: string = '';
  newTestiText: string = '';
  activeTestiIndex: number = 0;

  // Inbox Received Messages
  messages: any[] = [];
  msgName: string = '';
  msgEmail: string = '';
  msgBody: string = '';

  // Dynamic Core Competencies
  coreCompetencies: any[] = [
    { title: 'Angular Standalone Framework', desc: 'Building state-of-the-art Single Page Applications using Angular standalone modules, reactive state management, custom routing paths, and reusable code bases.' },
    { title: 'Creative UI/UX Design', desc: 'Crafting stunning glassmorphism surfaces, tailored light/dark variables, premium high-contrast typography, and fluid micro-interactions that engage.' },
    { title: 'Performance & SEO', desc: 'Ensuring lightning-fast page loading speeds, high SEO indexing, hardware-accelerated CSS animations, clean markup structures, and responsive grid layouts.' }
  ];
  newCompTitle: string = '';
  newCompDesc: string = '';

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

        // Load new profile fields
        if (data.avatarUrl) {
          this.avatarUrl = data.avatarUrl;
          if (
            this.avatarUrl.includes('CatDV.jpeg') ||
            this.avatarUrl.includes('C:') ||
            this.avatarUrl.includes('unsplash.com') ||
            this.avatarUrl.includes('unsplash')
          ) {
            this.avatarUrl = 'profile.jpg';
            this.saveData();
          }
        }
        if (data.email) this.email = data.email;
        if (data.phone) this.phone = data.phone;
        if (data.location) this.location = data.location;
        if (data.githubUrl) this.githubUrl = data.githubUrl;
        if (data.linkedinUrl) this.linkedinUrl = data.linkedinUrl;
        if (data.experience !== undefined) this.experience = data.experience;
        if (data.projectsCount !== undefined) this.projectsCount = data.projectsCount;
        if (data.clientsCount !== undefined) this.clientsCount = data.clientsCount;

        // Load dynamic rich arrays
        if (data.workExperiences) this.workExperiences = data.workExperiences;
        if (data.testimonials) this.testimonials = data.testimonials;
        if (data.messages) this.messages = data.messages;
        if (data.coreCompetencies) this.coreCompetencies = data.coreCompetencies;
        if (data.educationList) this.educationList = data.educationList;
      } catch (e) {
        console.error('Failed to parse saved portfolio data from localStorage', e);
      }
    }
    this.updateThemeColors(this.accentColor);
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
      projects: this.projects,

      // Save new profile fields
      avatarUrl: this.avatarUrl,
      email: this.email,
      phone: this.phone,
      location: this.location,
      githubUrl: this.githubUrl,
      linkedinUrl: this.linkedinUrl,
      experience: this.experience,
      projectsCount: this.projectsCount,
      clientsCount: this.clientsCount,

      // Save rich arrays
      workExperiences: this.workExperiences,
      testimonials: this.testimonials,
      messages: this.messages,
      coreCompetencies: this.coreCompetencies,
      educationList: this.educationList
    };
    localStorage.setItem('portfolio_data', JSON.stringify(data));
  }

  // Update root CSS theme variables dynamically
  updateThemeColors(color: string) {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--accent-color', color);
      let lightColor = color + '1a'; // ~10% opacity
      let ultraLightColor = color + '05'; // ~2% opacity
      if (color === '#0f172a') {
        lightColor = 'rgba(15, 23, 42, 0.08)';
        ultraLightColor = 'rgba(15, 23, 42, 0.02)';
      }
      document.documentElement.style.setProperty('--accent-light', lightColor);
      document.documentElement.style.setProperty('--accent-ultra-light', ultraLightColor);
    }
  }

  // Color Selector handler
  selectColor(color: string) {
    this.accentColor = color;
    this.updateThemeColors(color);
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

  // Dynamic Work Experience logic
  addWorkItem() {
    if (!this.newWorkCompany.trim() || !this.newWorkRole.trim()) {
      alert('Please enter both Company and Role!');
      return;
    }
    this.workExperiences.push({
      company: this.newWorkCompany,
      role: this.newWorkRole,
      duration: this.newWorkDuration || '2024 - Present',
      summary: this.newWorkSummary
    });
    this.saveData();
    this.newWorkCompany = '';
    this.newWorkRole = '';
    this.newWorkDuration = '';
    this.newWorkSummary = '';
  }

  removeWorkItem(index: number) {
    this.workExperiences.splice(index, 1);
    this.saveData();
  }

  // Dynamic Testimonials logic
  addTestiItem() {
    if (!this.newTestiAuthor.trim() || !this.newTestiText.trim()) {
      alert('Please enter Author Name and Recommendation text!');
      return;
    }
    this.testimonials.push({
      author: this.newTestiAuthor,
      designation: this.newTestiDesignation || 'Client / Peer',
      text: this.newTestiText
    });
    this.saveData();
    this.activeTestiIndex = this.testimonials.length - 1;
    this.newTestiAuthor = '';
    this.newTestiDesignation = '';
    this.newTestiText = '';
  }

  removeTestiItem(index: number) {
    this.testimonials.splice(index, 1);
    this.saveData();
    this.activeTestiIndex = Math.max(0, this.activeTestiIndex - 1);
  }

  nextTestimonial() {
    if (this.testimonials.length > 0) {
      this.activeTestiIndex = (this.activeTestiIndex + 1) % this.testimonials.length;
    }
  }

  prevTestimonial() {
    if (this.testimonials.length > 0) {
      this.activeTestiIndex = (this.activeTestiIndex - 1 + this.testimonials.length) % this.testimonials.length;
    }
  }

  // Contact Form Received Message logic
  sendContactMessage() {
    if (!this.msgName.trim() || !this.msgBody.trim()) {
      alert('Please enter your Name and Message content!');
      return;
    }
    const newMessage = {
      name: this.msgName,
      email: this.msgEmail || 'No Email provided',
      body: this.msgBody,
      date: new Date().toLocaleString()
    };
    this.messages.push(newMessage);
    this.saveData();
    alert('Thank you! Your message has been sent successfully. It is logged in your Inbox customizer panel on the right!');
    this.msgName = '';
    this.msgEmail = '';
    this.msgBody = '';
  }

  removeMessage(index: number) {
    this.messages.splice(index, 1);
    this.saveData();
  }

  // Dynamic Core Competencies Card management
  addCompetencyCard() {
    if (!this.newCompTitle.trim() || !this.newCompDesc.trim()) {
      alert('Please fill out both the Competency Title and Description!');
      return;
    }
    this.coreCompetencies.push({
      title: this.newCompTitle,
      desc: this.newCompDesc
    });
    this.saveData();
    this.newCompTitle = '';
    this.newCompDesc = '';
  }

  removeCompetencyCard(index: number) {
    this.coreCompetencies.splice(index, 1);
    this.saveData();
  }

  // Dynamic Education management
  addEduItem() {
    if (!this.newEduSchool.trim() || !this.newEduDegree.trim()) {
      alert('Please enter both School Name and Degree/Major!');
      return;
    }
    this.educationList.push({
      school: this.newEduSchool,
      degree: this.newEduDegree,
      duration: this.newEduDuration || '2022',
      cgpa: this.newEduCgpa || '',
      summary: this.newEduSummary
    });
    this.saveData();
    this.newEduSchool = '';
    this.newEduDegree = '';
    this.newEduDuration = '';
    this.newEduCgpa = '';
    this.newEduSummary = '';
  }

  removeEduItem(index: number) {
    this.educationList.splice(index, 1);
    this.saveData();
  }
}
