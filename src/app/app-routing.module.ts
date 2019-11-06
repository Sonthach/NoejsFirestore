import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // thêm dòng này
  { path: 'login', component: LoginComponent },
  { path: 'home/admin', component: HomeComponent } // thêm dòng này
];

@NgModule({
  imports: [BrowserModule,FormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
