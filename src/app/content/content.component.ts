import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsService } from 'src/items.service';
import { Item } from '../model/Item';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private service: ItemsService) { }
			
			itemList: Observable<Item[]>;

  ngOnInit() {
  }

}
