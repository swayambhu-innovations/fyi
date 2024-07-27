import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {CancelBtnComponent} from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import {SaveBtnComponent} from '../../../../../../shared-ui/src/save-btn/save-btn.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [ReactiveFormsModule,CancelBtnComponent,SaveBtnComponent,CommonModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss'
})
export class AddCityComponent {
  cityForm: FormGroup = new FormGroup({
    cityName: new FormControl('', Validators.required),
    cityId: new FormControl(''),
    catalougeType: new FormControl('weight'),
    active: new FormControl(true),
  });


  constructor(
   
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<AddCityComponent>,
    private Storage: Storage
  ) {}
}
