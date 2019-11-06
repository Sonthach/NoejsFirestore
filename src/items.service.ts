import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './app/model/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  constructor(private http: HttpClient) { }

		  getItems():Observable <Item[]>{
      return this.http.get<Item[]>('http://localhost:8000/api/items/');
      }
}
