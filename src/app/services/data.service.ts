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

  filterBy(filterType: string): Observable<Item[]>{
    const date = new Date(); //today
    let year = 0;
    let month = 0;
    let day = 0;
    switch(filterType){
      case 'yesterday':
        date.setDate(date.getDate() - 1);
        break;
      case 'lastweek':
        date.setDate(date.getDate() - 7);
        break;
    }
    
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getUTCDate();

    const dateConcatenated = year+''+month+''+day; // example 2022/12/11 will be 20221211

    return this.http.get<Item[]>(environment.server+`api/content/render/false/query/+contentType:Blog%20+Blog.sysPublishDate:%5B${dateConcatenated}%20TO%20${dateConcatenated}%5D%20+languageId:1%20+deleted:false%20+working:true/orderby/Blog.sysPublishDate%20desc`)
          .pipe(map((el:any) => el['contentlets'].filter((item:any) =>!item.archived)));
    
  }

  getData(): Observable<Item[]>{
    return this.http.get<Item[]>(environment.server+'api/content/render/false/query/+contentType:Blog%20+(conhost:48190c8c-42c4-46af-8d1a-0cd5db894797%20conhost:SYSTEM_HOST)%20+languageId:1%20+deleted:false%20+working:true/orderby/modDate%20desc')
    .pipe(map((el:any) => el['contentlets'].filter((item:any) =>!item.archived)));
  }
}
