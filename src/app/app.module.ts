import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './pages/auth/login/login.component';
import { UsersComponent } from './pages/auth/users/users.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppInitializerFactory, AppInitializerProvider} from './services/shared/app.initializer';
import {HttpInterceptor} from './services/shared/http.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {StringFormatPipe} from './pipes/shared/string-format.pipe';
import {EnterToBrPipe} from './pipes/shared/enter-to-br.pipe';
import {TruncatePipe} from './pipes/shared/truncate.pipe';
import {TranslatePipe} from './pipes/shared/translate.pipe';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule} from '@angular/material/menu';
import { GridComponent } from './components/grid/grid.component';
import { WaitingComponent } from './components/waiting/waiting.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    TruncatePipe,
    EnterToBrPipe,
    StringFormatPipe,
    TranslatePipe,
    HeaderComponent,
    GridComponent,
    WaitingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializerFactory,
      deps: [AppInitializerProvider],
      multi: true,
    },
    AppInitializerProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
