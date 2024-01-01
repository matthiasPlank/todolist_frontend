import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor  {

  constructor( private router: Router) { 

  }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token'); 

    if(token){
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });

    }

    return next.handle(httpRequest).pipe(
      catchError((error) => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            this.router.navigateByUrl('/login'); 
          }
        }
        return throwError(() => error) 
      })
    );
  }
}
