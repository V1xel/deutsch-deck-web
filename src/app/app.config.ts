import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: 'API_ENDPOINT', useValue: process.env['API_ENDPOINT'] },
  ]
};
