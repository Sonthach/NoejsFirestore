import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './app/model/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private http: HttpClient) { }

		  getBooks(){
        return this.http.get('http://localhost:8000/api/books')
      }

      createBook(data){
        return this.http.post('http://localhost:8000/api/createBook',data)
      }
}
