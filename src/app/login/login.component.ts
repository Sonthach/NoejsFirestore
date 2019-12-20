import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;


  constructor(public afs: AngularFireAuth, private cookie : CookieService,public authService: AuthService,private router: Router) { 
  }

  Login(email, password){
    this.afs.auth.signInWithEmailAndPassword(email,password).then(res =>{
      window.alert("Đăng nhập thành công !")
      //this.cookie.set("email",res.user.email)
      window.location.href = 'home/admin'
    }).catch (err => {
      window.alert("Sai Email hoặc Mật khẩu !")
    })
    
  }
  ngOnInit() {
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.cookie.set("email",res.displayName)
      this.router.navigate(['/home/admin/dashboard'])
    })
    }	

}
