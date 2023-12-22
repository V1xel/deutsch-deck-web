import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject, Injector } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { API_ENDPOINT_TOKEN } from './app.config';

const apolloOptionsFactory = (injector: Injector) => {
  const httpLink = inject(HttpLink);
  return {
    link: httpLink.create({ uri: injector.get(API_ENDPOINT_TOKEN) }),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
    deps: [Injector]
  },
];
