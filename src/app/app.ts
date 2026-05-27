import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('antiday1-app');

  constructor() {
    this.applyGlobalTheme();
  }

  applyGlobalTheme() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('portfolio_data');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (data.accentColor) {
            const color = data.accentColor;
            document.documentElement.style.setProperty('--accent-color', color);
            let lightColor = color + '1a'; // 10% opacity
            let ultraLightColor = color + '05'; // 2% opacity
            if (color === '#0f172a') {
              lightColor = 'rgba(15, 23, 42, 0.08)';
              ultraLightColor = 'rgba(15, 23, 42, 0.02)';
            }
            document.documentElement.style.setProperty('--accent-light', lightColor);
            document.documentElement.style.setProperty('--accent-ultra-light', ultraLightColor);
          }
        } catch (e) {
          console.error('Failed to apply global portfolio theme on start', e);
        }
      }
    }
  }
}

