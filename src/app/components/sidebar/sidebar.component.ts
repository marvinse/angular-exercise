import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';

const fadeInOut = trigger('fadeInOut', [
  state(
    'open',
    style({
      opacity: 1,
    })
  ),
  state(
    'close',
    style({
      opacity: 0,
    })
  ),
  transition('open => close', [animate('0.5s ease-out')]),
  transition('close => open', [animate('0.5s ease-in')]),
])

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [fadeInOut]
})
export class SidebarComponent implements OnInit{
  @Input() items: Item[] = [];
  showMenu: boolean = false;
  isHome: boolean = false;
  url: string = environment.server;

  constructor(private location: Location) {}

  ngOnInit() {
    if(this.location.path() == ''){
      this.isHome = true;
    }
  }
}
