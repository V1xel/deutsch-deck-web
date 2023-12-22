import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { graphqlProvider } from './graphql.provider';

export const API_ENDPOINT_TOKEN = new InjectionToken<string>('API_ENDPOINT');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    graphqlProvider,
    { provide: API_ENDPOINT_TOKEN, useValue: process.env['API_ENDPOINT'] },
  ]
};
