import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  github: string;
  linkedin: string;
  summary: string;
}

interface WorkExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  certifications: string[];
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class ResumeBuilder implements OnInit {
  // Mobile Tab toggle
  public activeTab = 'edit';

  // Form Data (Bound to Inputs)
  public formData: ResumeData = {
    personalInfo: {
      fullName: 'Alex Morgan',
      title: 'Creative Frontend Engineer',
      email: 'alex@morgan.dev',
      phone: '+1 (555) 019-2834',
      address: 'San Francisco, CA',
      website: 'alexmorgan.dev',
      github: 'github.com/alexmorgan',
      linkedin: 'linkedin.com/in/alexmorgan',
      summary: 'Hi, I am a passionate software engineer specializing in building ultra-responsive, beautiful SPA interfaces engineered using Angular, modern glassmorphic layouts, and high-contrast light canvas designs.'
    },
    experience: [
      {
        company: 'Portfolio Labs',
        position: 'Senior UI Architect',
        location: 'San Francisco, CA',
        startDate: '2024-03',
        endDate: '',
        current: true,
        description: 'Led frontend migration from legacy structures to high-performance standalone Angular layouts.\nDesigned custom CSS-variable HSL styling tokens that allow absolute layout adaptability.'
      }
    ],
    education: [
      {
        school: 'Stanford University',
        degree: 'B.S. in Computer Science',
        location: 'Stanford, CA',
        startDate: '2019-09',
        endDate: '2023-06',
        current: false,
        description: 'Graduated with Honors. Specialized in Client-side Frameworks and Human-Computer Interaction.'
      }
    ],
    projects: [
      {
        name: 'Glassmorphic Analytics Dashboard',
        description: 'A premium, high-contrast analytics dashboard with real-time charting and dark mode.',
        technologies: 'Web',
        link: 'github.com'
      }
    ],
    skills: ['Frontend Architecture', 'Creative UI/UX Design', 'Performance & SEO'],
    certifications: [
      'AWS Certified Solutions Architect',
      'Google Professional Cloud Developer'
    ]
  };

  // Preview Data (Bound to the Resume Sheet - updates only on Save!)
  public previewData: ResumeData = JSON.parse(JSON.stringify(this.formData));

  // Collapsible Sections Expanded State
  public expandedSections = {
    personal: true,
    experience: false,
    education: false,
    projects: false,
    skills: false,
    certifications: false
  };

  // Helper inputs for adding single items
  public newSkill = '';
  public newCertification = '';

  ngOnInit() {
    this.loadFromPortfolio(false); // Load from storage or portfolio
  }

  // Toggle dropdown / collapsible section
  public toggleSection(section: keyof typeof ResumeBuilder.prototype.expandedSections) {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  // Work Experience Methods (Modifies formData)
  public addExperience() {
    this.formData.experience.push({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    this.expandedSections.experience = true;
  }

  public removeExperience(index: number) {
    this.formData.experience.splice(index, 1);
  }

  // Education Methods (Modifies formData)
  public addEducation() {
    this.formData.education.push({
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    this.expandedSections.education = true;
  }

  public removeEducation(index: number) {
    this.formData.education.splice(index, 1);
  }

  // Projects Methods (Modifies formData)
  public addProject() {
    this.formData.projects.push({
      name: '',
      description: '',
      technologies: '',
      link: ''
    });
    this.expandedSections.projects = true;
  }

  public removeProject(index: number) {
    this.formData.projects.splice(index, 1);
  }

  // Skills Methods (Modifies formData)
  public addSkill() {
    if (!this.newSkill.trim()) return;
    this.formData.skills.push(this.newSkill.trim());
    this.newSkill = '';
  }

  public removeSkill(index: number) {
    this.formData.skills.splice(index, 1);
  }

  // Certifications Methods (Modifies formData)
  public addCertification() {
    if (!this.newCertification.trim()) return;
    this.formData.certifications.push(this.newCertification.trim());
    this.newCertification = '';
  }

  public removeCertification(index: number) {
    this.formData.certifications.splice(index, 1);
  }

  // Save changes from Form to Preview
  public saveChanges() {
    this.previewData = JSON.parse(JSON.stringify(this.formData));
    localStorage.setItem('resume_builder_data', JSON.stringify(this.formData));
  }

  // Reset form and preview to empty state
  public resetForm() {
    if (confirm('Are you sure you want to clear all resume fields?')) {
      const emptyState: ResumeData = {
        personalInfo: {
          fullName: '',
          title: '',
          email: '',
          phone: '',
          address: '',
          website: '',
          github: '',
          linkedin: '',
          summary: ''
        },
        experience: [],
        education: [],
        projects: [],
        skills: [],
        certifications: []
      };
      
      this.formData = JSON.parse(JSON.stringify(emptyState));
      this.previewData = JSON.parse(JSON.stringify(emptyState));
      localStorage.setItem('resume_builder_data', JSON.stringify(this.formData));
    }
  }

  // Sync from Portfolio data dynamically
  public loadFromPortfolio(forceSync: boolean = false) {
    const savedResume = localStorage.getItem('resume_builder_data');
    if (savedResume && !forceSync) {
      try {
        this.formData = JSON.parse(savedResume);
        this.previewData = JSON.parse(JSON.stringify(this.formData));
        return;
      } catch (e) {
        console.error('Failed to parse saved resume data, falling back to portfolio mapping', e);
      }
    }

    // Mapping from Portfolio
    const savedPortfolio = localStorage.getItem('portfolio_data');
    if (savedPortfolio) {
      try {
        const port = JSON.parse(savedPortfolio);
        
        if (port.name) this.formData.personalInfo.fullName = port.name;
        if (port.headline) this.formData.personalInfo.title = port.headline;
        if (port.email) this.formData.personalInfo.email = port.email;
        if (port.phone) this.formData.personalInfo.phone = port.phone;
        if (port.location) this.formData.personalInfo.address = port.location;
        if (port.bio) this.formData.personalInfo.summary = port.bio;
        
        if (port.githubUrl) {
          this.formData.personalInfo.github = this.cleanUrl(port.githubUrl);
        }
        if (port.linkedinUrl) {
          this.formData.personalInfo.linkedin = this.cleanUrl(port.linkedinUrl);
        }
        
        // Map rich skills array
        if (port.coreCompetencies && Array.isArray(port.coreCompetencies) && port.coreCompetencies.length > 0) {
          this.formData.skills = port.coreCompetencies.map((c: any) => c.title);
        } else {
          // Fallback to legacy skill cards
          const skillsArray: string[] = [];
          if (port.skill1Title) skillsArray.push(port.skill1Title);
          if (port.skill2Title) skillsArray.push(port.skill2Title);
          if (port.skill3Title) skillsArray.push(port.skill3Title);
          if (skillsArray.length > 0) {
            this.formData.skills = skillsArray;
          }
        }

        // Map rich work experience logs
        if (port.workExperiences && Array.isArray(port.workExperiences) && port.workExperiences.length > 0) {
          this.formData.experience = port.workExperiences.map((w: any) => ({
            company: w.company || '',
            position: w.role || '',
            location: '',
            startDate: '',
            endDate: '',
            current: w.duration ? w.duration.includes('Present') : false,
            description: w.summary || ''
          }));
        }

        // Map rich projects array
        if (port.projects && Array.isArray(port.projects) && port.projects.length > 0) {
          this.formData.projects = port.projects.map((p: any) => ({
            name: p.name || '',
            description: p.desc || '',
            technologies: p.category || '',
            link: this.cleanUrl(p.link || '')
          }));
        }

        // Map rich education details
        if (port.educationList && Array.isArray(port.educationList) && port.educationList.length > 0) {
          this.formData.education = port.educationList.map((edu: any) => ({
            school: edu.school || '',
            degree: edu.cgpa ? `${edu.degree || ''} (CGPA: ${edu.cgpa})` : (edu.degree || ''),
            location: '',
            startDate: '',
            endDate: edu.duration || '',
            current: false,
            description: edu.summary || ''
          }));
        }

        this.saveChanges();
        if (forceSync) {
          alert('Resume updated successfully with latest data from Portfolio!');
        }
      } catch (e) {
        console.error('Failed to parse portfolio data for mapping', e);
        if (forceSync) alert('Could not sync portfolio data. Make sure it is customized first!');
      }
    } else {
      if (forceSync) alert('No portfolio data found to sync. Go to the Portfolio page first to write your details!');
    }
  }

  // Clean URLs like https://github.com to print-friendly ones like github.com
  private cleanUrl(url: string): string {
    if (!url) return '';
    return url.replace(/https?:\/\/(www\.)?/, '');
  }

  // Handle Dynamic Summary Description Multi-Line String formatting
  public getParagraphs(text: string): string[] {
    if (!text) return [];
    return text.split('\n').filter(p => p.trim().length > 0);
  }

  // Print/PDF trigger
  public triggerPrint() {
    window.print();
  }

  // Format month input (YYYY-MM) into print-friendly string (e.g. Jun 2023)
  public formatDate(monthStr: string): string {
    if (!monthStr) return '';
    const parts = monthStr.split('-');
    if (parts.length !== 2) return monthStr; // Return as-is if already text formatted or not YYYY-MM
    
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    if (month >= 1 && month <= 12) {
      return `${monthNames[month - 1]} ${year}`;
    }
    
    return monthStr;
  }
}
