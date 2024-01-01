import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptorService } from './services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes) , 
              provideHttpClient( 
                  withInterceptorsFromDi(), 
              ), 
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
            ]
};
