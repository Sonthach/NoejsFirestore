import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Item} from '../model/Item'
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	email : string
	displayName:string="";
		  constructor(private cookie : CookieService,private userService:UserService,private auth : AuthService) {
			
		  }

  ngOnInit() {
		// this.email = this.cookie.get("email")
		// console.log(this.email)

		this.userService.getCurrentUser().then(
			user=> this.displayName = user.displayName!=null? user.displayName: user.email    );
		  
		  console.log(this.displayName);
	}
	
	Logout(){
		this.auth.logout();
			location.href="/login";
	}
}
