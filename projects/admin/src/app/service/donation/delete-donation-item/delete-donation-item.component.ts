import { Component, Inject } from '@angular/core';
import { DeleteBtnComponent } from '../../../../../../shared-ui/src/delete-btn/delete-btn.component';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DonationItemService } from '../service/donation-item.service';
@Component({
  selector: 'app-delete-donation-item',
  standalone: true,
  imports: [DeleteBtnComponent,CancelBtnComponent],
  templateUrl: './delete-donation-item.component.html',
  styleUrl: './delete-donation-item.component.scss'
})
export class DeleteDonationItemComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<DeleteDonationItemComponent>,
    private DonationItemService:DonationItemService
  ) {
    console.log(data)
  }
  count:number=0;
  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }
  deleteTax(): void {
    this.DonationItemService.deleteDonationItem(this.data.itemId).then(()=>{
      this._bottomSheetRef.dismiss();
    })
  }
}
