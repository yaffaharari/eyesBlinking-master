import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './user-details/register/register.component';
import {LoginComponent} from './user-details/login/login.component';
import {OpenWebCamComponent} from './blinking/open-web-cam/open-web-cam.component';

const appRouter: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent},

  {path: 'openwebcam', component: OpenWebCamComponent}
  // {path: 'openwebcam', loadChildren: './blinking/blinking.module#BlinkingModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
