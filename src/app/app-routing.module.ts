import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // thêm dòng này
  { path: 'login', component: LoginComponent } // thêm dòng này
];

@NgModule({
  imports: [BrowserModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
