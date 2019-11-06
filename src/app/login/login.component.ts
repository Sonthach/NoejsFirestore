import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from '../model/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : Observable<User>
  angForm: FormGroup;


  constructor(public afs: AngularFireAuth) { 
  }

  Login(email, password){
    this.afs.auth.signInWithEmailAndPassword(email,password).then(res =>{
      window.alert("Đăng nhập thành công !")
      window.location.href = 'home/admin'
    }).catch (err => {
      window.alert("Sai Email hoặc Mật khẩu !")
    })
    
  }
  ngOnInit() {
  }

}
