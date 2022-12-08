import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { Item } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy{
  @Input() item?: Item ;
  url: string = environment.server;
  private _destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute,
    private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this._destroy$)).subscribe((params) => {
      this.item = this.backendService.getItem(params['id']);
    });

    this.backendService.myItems$.pipe(takeUntil(this._destroy$)).subscribe( (data:Item[])=> {
      if( !this.item ){
        this.item = data[0];
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
