import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IdentityService } from '../auth/identity.service';
import { DeviceUUID } from 'device-uuid';

const DEVICE_ID = new DeviceUUID().get();

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly identityService: IdentityService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let auth = this.identityService.identity.token || '';
    if (auth) {
      auth = 'Bearer ' + auth;
    }
    request = request.clone({
      setHeaders: {
        DeviceId: DEVICE_ID,
        Authorization: auth,
        // @ts-ignore
        'ngsw-bypass': 'true',
      },
    });
    return next
      .handle(request)
      .pipe(
        tap((httpEvent: any) => {
          // Skip request
          if (httpEvent.type === 0) {
            return;
          }

          if (httpEvent instanceof HttpResponse) {
            if (httpEvent.headers.has('new-token')) {
              this.identityService.newToken(httpEvent.headers.get('new-token'));
            }
          }
        })
      )
      .pipe(
        catchError((error: any, caught: Observable<HttpEvent<any>>) => {
          if (error.status === 401) {
            const loader = document.getElementById('app-loading-container');
            if (loader) {
              document.body.removeChild(loader);
            }
            this.identityService.logout();
            window.location.href = '/';
            // if you've caught / handled the error, you don't
            // want to rethrow it unless you also want
            // downstream consumers to have to handle it as
            // well.
            return of(error);
          }
          throw error;
        })
      );
  }
}
