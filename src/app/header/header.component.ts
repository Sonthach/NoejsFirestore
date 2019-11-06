import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Item} from '../model/Item'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
		  items: Observable<Item[]>;
		  constructor(private readonly afs: AngularFirestore) {
			this.itemsCollection = afs.collection<Item>('Item');
			// .valueChanges() is simple. It just returns the 
			// JSON data without metadata. If you need the 
			// doc.id() in the value you must persist it your self
			// or use .snapshotChanges() instead. 
			this.items = this.itemsCollection.valueChanges();
		  }

  ngOnInit() {
  }

}
