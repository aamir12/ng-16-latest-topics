import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InitializerModule } from './core/modules/initializer.module';
import { NetworkInterceptor } from './core/interceptors/network.interceptor';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GlobalLoaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    InitializerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
