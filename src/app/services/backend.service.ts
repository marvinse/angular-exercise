import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Item } from '../interfaces/interfaces';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private items : Item[] = [];
  private myItems = new BehaviorSubject<Item[]>([]);
  myItems$ = this.myItems.asObservable();
  
  constructor(private myDataService: DataService) {
    this.myDataService.getData().subscribe( (data: Item[])=> {
      this.items = data;
      this.myItems.next(data);
    });
  }

  getItem(id:string): Item {
    return this.items.filter(item => item.inode == id)[0];
  }

  filterBy(filterType: string) {
    this.myDataService.filterBy(filterType).pipe(take(1)).subscribe( (data: Item[])=> {
      if(data.length == 0){
        alert('No results');
      }else {
        this.items = data;
        this.myItems.next(data);
      }
    });
  }
}
