import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidenavComponent } from './public/components/sidenav/sidenav.component';
import { ToolbarComponent } from './public/components/toolbar/toolbar.component';
import { LoginComponent } from './public/components/login/login.component';
import { HomeComponent } from './public/components/home/home.component';

import { StoresComponent } from './public/components/stores/stores.component';
import { SharedModule } from './shared/shared.module';

import { AppInitService } from './app-init.service';
import { CookieService } from 'ngx-cookie-service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './core/state/reducers/user.reducer';
import { FeedbackComponent } from './public/components/feedback/feedback.component';
import { DatePipe } from '@angular/common';

export function appInit(appInitService: AppInitService) {
  return(): Promise<any> => {
    return appInitService.Init();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    LoginComponent,
    HomeComponent,
    StoresComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot({}),
    StoreModule.forFeature('user', userReducer),
    AppRoutingModule
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [
    CookieService,
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [AppInitService],
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
