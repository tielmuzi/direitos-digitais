import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircle } from 'ionicons/icons';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environments/environment';
import { SupabaseService } from './app/supabase.service';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideServiceWorker } from '@angular/service-worker';

addIcons({
  'alert-circle': alertCircle
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(
    ),
    SupabaseService, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ],
});
