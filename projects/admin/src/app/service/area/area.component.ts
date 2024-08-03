import { Component } from '@angular/core';
import { AddButtonComponent } from "../../../../../shared-ui/src/lib/add-button/add-button.component";
import { CommonModule } from '@angular/common';
import { AddCityComponent } from './add-city/add-city.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-area',
  standalone: true,
  imports: [AddButtonComponent,CommonModule,AddCityComponent],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent {
  constructor(  private _bottomSheet: MatBottomSheet,){}
cityList=[
  {
  city:'prayagraj',
  state:'Uttar Pradesh'
},
{
  city:'prayagraj',
   state:'Uttar Pradesh'
},
{
  city:'prayagraj',
   state:'Uttar Pradesh'
},




]


savecity(): void {
  this._bottomSheet.open(AddCityComponent);
}
}
