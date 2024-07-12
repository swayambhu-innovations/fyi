import { Component, Inject } from '@angular/core';
import { DeleteBtnComponent } from '../../../../../../shared-ui/src/delete-btn/delete-btn.component';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TaxService } from '../service/tax.service';
@Component({
  selector: 'app-delete-tax',
  standalone: true,
  imports: [DeleteBtnComponent,CancelBtnComponent],
  templateUrl: './delete-tax.component.html',
  styleUrl: './delete-tax.component.scss'
})
export class DeleteTaxComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<DeleteTaxComponent>,
    private taxService:TaxService
  ) {
    console.log(data)
  }
  count:number=15;
  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }
  deleteTax(): void {
    this.taxService.deleteTax(this.data).then(()=>{
      this._bottomSheetRef.dismiss();
    })
  }
}
