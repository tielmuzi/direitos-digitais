import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { QuestionarioPage } from './questionario/questionario.page';
import { RelatosPage } from './relatos/relatos.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { DenunciarPage } from './pages/denunciar/denunciar.page';
import { IntroPage } from './pages/intro/intro.page';

import { NgModule } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [

    // outros módulos...
  ],
  // ...
})
export class AppModule {}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(

    ),
    // outros providers...
  ]
});

export const routes: Routes = [
  {
    path: '',
    component: IntroPage
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'questionario',
    component: QuestionarioPage
  },
  {
    path: 'relatos',
    component: RelatosPage
  },
  {
    path: 'dashboard',
    component: DashboardPage
  },
  {
    path: 'denunciar',
    component: DenunciarPage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then( m => m.IntroPage)
  }
];
