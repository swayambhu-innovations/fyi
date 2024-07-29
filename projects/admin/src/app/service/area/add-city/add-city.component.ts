import { Component, Inject } from '@angular/core';
import { CancelBtnComponent } from "../../../../../../shared-ui/src/cancel-btn/cancel-btn.component";
import { SaveBtnComponent } from "../../../../../../shared-ui/src/save-btn/save-btn.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [CancelBtnComponent, SaveBtnComponent,ReactiveFormsModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss'
})
export class AddCityComponent {

constructor(  @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
private _bottomSheetRef: MatBottomSheetRef<AddCityComponent>){

}

  cityForm: FormGroup = new FormGroup({
    // taxName: new FormControl('', Validators.required),
    catalougeType: new FormControl('percentage', Validators.required),
    active: new FormControl(true),
    catalougeId: new FormControl(''),
  });



  cancel() {
    this._bottomSheetRef.dismiss();
  }
}
