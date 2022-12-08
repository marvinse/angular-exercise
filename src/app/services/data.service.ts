import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Item } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Item[]>{
    /*return this.http.get<Item[]>(environment.server+'api/content/render/false/query/+contentType:Blog%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true/orderby/modDate%20desc')
          .pipe(map((el:any) => el['contentlets'].slice(0, 3))); */
    return of([
      {
        inode: "1bc",
        imageVersion: "https://llandscapes-10674.kxcdn.com/wp-content/uploads/2019/07/mood.jpg.webp",
        identifier: "1bc",
        postingDate: "Wed Dec 07 2022 21:50:33 GMT-0600",
        teaser: "Lorem iosun",
        title: "the title 1"
      },
      {
        inode: "2bc",
        imageVersion: "https://expertphotography.b-cdn.net/wp-content/uploads/2022/05/Landscape-Photography-Sophie-Turner.jpg",
        identifier: "2bc",
        postingDate: "Wed Dec 07 2022 21:50:33 GMT-0600",
        teaser: "jrjryjtyktykty iosun",
        title: "the title 2"
      },
      {
        inode: "3bc",
        imageVersion: "https://cdn3.dpmag.com/2021/07/Landscape-Tips-Mike-Mezeul-II.jpg",
        identifier: "3bc",
        postingDate: "Wed Dec 07 2022 21:50:33 GMT-0600",
        teaser: "dfdfsdfsdf iosun",
        title: "the title 3"
      }
    ]
    )
  }
}
