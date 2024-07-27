import { Component } from '@angular/core';
import { AddButtonComponent } from "../../../../../shared-ui/src/lib/add-button/add-button.component";
import { AddCityComponent } from './add-city/add-city.component';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [AddButtonComponent],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent {
  private _bottomSheet: any;
  addDonationItem(): void {
    this._bottomSheet.open(AddCityComponent);
  }
}
