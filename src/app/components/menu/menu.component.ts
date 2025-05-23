import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, RouterLinkActive]
})
export class MenuComponent {
  menuItems = [
    { title: 'Home', icon: 'home', path: '/home' },
    { title: 'Questionário', icon: 'document-text', path: '/questionario' },
    { title: 'Relatar Violação', icon: 'warning', path: '/relatos' },
    { title: 'Dashboard', icon: 'stats-chart', path: '/dashboard' },
    { title: 'Denunciar', icon: 'alert-circle', path: '/denunciar' }
  ];

  isDarkMode = false;

  constructor() {
    // Verificar preferência do usuário ao carregar
    this.checkDarkModePreference();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);

    // Opcional: Salvar preferência no localStorage
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  private checkDarkModePreference() {
    // Verificar localStorage
    const darkMode = localStorage.getItem('darkMode');

    // Verificar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (darkMode === 'true' || (darkMode === null && prefersDark.matches)) {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    }
  }
}
