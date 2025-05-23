import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './components/menu/menu.component';
import { SupabaseService } from './supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, MenuComponent, CommonModule],
  providers: [SupabaseService]
})
export class AppComponent implements OnInit {
  todos: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.loadTodos();
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    }
  }

  async loadTodos() {
    const { data, error } = await this.supabaseService.getTodos();
    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      this.todos = data;
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
  }
}
