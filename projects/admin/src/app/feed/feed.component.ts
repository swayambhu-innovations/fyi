import { Component } from '@angular/core';
import {HeaderWithMenuComponent } from '../sharedComponent/header-with-menu/header-with-menu.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [HeaderWithMenuComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {

}
