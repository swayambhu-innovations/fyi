import { Component, Inject } from '@angular/core';
import { DeleteBtnComponent } from '../../../../../shared-ui/src/delete-btn/delete-btn.component';
import { CancelBtnComponent } from '../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-delete-bottom-sheet',
  standalone: true,
  imports: [DeleteBtnComponent,CancelBtnComponent],
  templateUrl: './delete-bottom-sheet.component.html',
  styleUrls: ['./delete-bottom-sheet.component.scss','../../service/tax/delete-tax/delete-tax.component.scss']
})
export class DeleteBottomSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<DeleteBottomSheetComponent>,
  ) {
    console.log(data)
    
  }
  count:number=0;
  
  closeSheet() {
    this._bottomSheetRef.dismiss(false);
  }

  delete() {
    console.log('delete');
    this._bottomSheetRef.dismiss(true);
  }
}
