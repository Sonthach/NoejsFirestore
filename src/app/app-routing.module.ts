import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { BookComponent } from './book/book.component';
import {AuthGuard} from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home/admin', component: HomeComponent,
  canActivate:[AuthGuard] , children : [
    { path: 'user', component: UserComponent },
    { path: 'product', component : BookComponent},
    {path: 'dashboard',component : DashboardComponent}
  ]},
];

@NgModule({
  imports: [BrowserModule,FormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
