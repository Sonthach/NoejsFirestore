import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
      resolve(res); //Hàm resolve returns a Promise object that is resolved with a given value
      }, err => {
      console.log(err);
      reject(err);
      })
    })
    }	

    logout(){
			return new Promise<any>((resolve,reject)=>{
				if (this.afAuth.auth.currentUser){
				  this.afAuth.auth.signOut();
				  resolve();
				}else{
				  reject();
				}

			})
		  }
}
