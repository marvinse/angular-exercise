import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Item } from './interfaces/interfaces';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy{

  items : Item[] = [];
  private _destroy$ = new Subject<void>();

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.myItems$.pipe(takeUntil(this._destroy$)).subscribe( (data:Item[])=> {
      this.items = data;
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
