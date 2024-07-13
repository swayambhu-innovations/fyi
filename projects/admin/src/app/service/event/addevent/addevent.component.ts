import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [],
  templateUrl: './addevent.component.html',
  styleUrl: './addevent.component.scss'
})
export class AddeventComponent {
  selected=""
  constructor(private router: Router) {}
  submit(select:string){
    this.selected=select;
  }
  
}
