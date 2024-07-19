import { Component } from '@angular/core';
import {HeaderWithMenuComponent } from '../sharedComponent/header-with-menu/header-with-menu.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [HeaderWithMenuComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

}
