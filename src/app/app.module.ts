import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user-details/login/login.component';
import { RegisterComponent } from './user-details/register/register.component';
import { OpenWebCamComponent } from './blinking/open-web-cam/open-web-cam.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {WebcamComponent} from 'ngx-webcam';
import { OpenWebService } from './blinking/open-web.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OpenWebCamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [OpenWebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
