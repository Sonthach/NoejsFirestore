import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import User from '../model/User';
import { auth } from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private usersCollection : AngularFirestoreCollection<User>;
  users : User[]
  user
  constructor(private afs : AngularFirestore, private auth : AngularFireAuth) 
  {
    this.usersCollection = this.afs.collection<User>("Users");
    this.usersCollection.snapshotChanges().subscribe(data =>{
      this.users = Object.assign(data)
    })

  }

  ngOnInit() {
    this.user = new User()
  }

  createUser() {
    this.user
    this.auth.auth.createUserWithEmailAndPassword(this.user.email,"123456").then(res => {
      let degbug = Object.assign(res);
      this.afs.collection("Users").doc(res.user.uid).set({
        id : res.user.uid,
        username : this.user.username,
        email : this.user.email,
        sodienthoai : this.user.sodienthoai,
        diachi : this.user.diachi,
        gioitinh : this.user.gioitinh,
        ngaysinh : this.user.ngaysinh
      })
    })
  }

}
