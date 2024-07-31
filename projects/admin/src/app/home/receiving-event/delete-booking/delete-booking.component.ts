import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ReceivingEventService } from '../../services/receiving-event.service';
import { CancelBtnComponent } from "../../../../../../shared-ui/src/cancel-btn/cancel-btn.component";
import { DeleteBtnComponent } from "../../../../../../shared-ui/src/delete-btn/delete-btn.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-booking',
  standalone: true,
  imports: [CancelBtnComponent, DeleteBtnComponent],
  templateUrl: './delete-booking.component.html',
  styleUrl: './delete-booking.component.scss'
})
export class DeleteBookingComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<DeleteBookingComponent>,
    private receivingeventService:ReceivingEventService,
    private router:Router
  ) {
   
  }
  count:number=0;
  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }
  deleteBooking(): void {
    const { userId, bookingId } = this.data;
    this.receivingeventService.delete(userId, bookingId).then(() => {
      this._bottomSheetRef.dismiss('deleted');
      this.router.navigate(['home']); // Update the path as needed
    }).catch((error) => {
      console.error('Error deleting booking: ', error);
    });
  }
}
