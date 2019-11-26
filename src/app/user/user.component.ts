import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import User from '../model/User';
//import { auth } from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { userInfo } from 'os';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;
  users;
  user;
  ngForm: FormGroup;
  vitri = ["Thu ngân", "Kế toán", "Quản lý"]
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth, private fb: FormBuilder) {
    this.createForm()

  }

  ngOnInit() {

    this.user = new User()
    this.usersCollection = this.afs.collection<User>("Users");
    this.getUser()
  }
getUser(){
  
  this.usersCollection.snapshotChanges().subscribe(data => {
    this.users = []
    let userList = Object.assign(data)
     userList.forEach(element => {
      this.users.push(element.payload.doc.data())
    })
    this.initViewsDataTables(this.users)
  })
}

  createForm() {
    this.ngForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      sodienthoai: ['', Validators.required],
      gioitinh: ['', Validators.required],
      ngaysinh: ['', Validators.required],
      diachi: ['', Validators.required]
    });
  }

  createUser() {
    this.user
    
    this.auth.auth.createUserWithEmailAndPassword(this.user.email, "123456").then(res => {
      this.afs.collection("Users").doc(res.user.uid).set({
        id: res.user.uid,
        username: this.user.username,
        email: this.user.email,
        sodienthoai: this.user.sodienthoai,
        diachi: this.user.diachi,
        gioitinh: this.user.gioitinh,
        ngaysinh: this.user.ngaysinh
      })

      this.user = {
        username: '',
        email: '',
        sodienthoai: '',
        diachi: '',
        gioitinh: '',
        ngaysinh: ''
      }
      
      this.getUser()
    })
    


  }

  initViewsDataTables(data) {
    console.log(data)
    $('#datatables').DataTable({
      data: data,
      destroy: true,
      columns: [
        {
          "render": function (data, type, row, meta) {
            return row.username
          }
        },

        {
          "render": function (data, type, row, meta) {
            return row.email
          }
        },

        {
          "render": function (data, type, row, meta) {
            return row.sodienthoai
          }
        },

        {
          "render": function (data, type, row, meta) {
            return row.gioitinh
          }
        },

        {
          "render": function (data, type, row, meta) {
            return row.ngaysinh
          }
        }
      ]
    })
  }
}
