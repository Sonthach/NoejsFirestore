import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getalluser(){
    return this.http.get('http://localhost:8000/api/getalluser');
  }
}
