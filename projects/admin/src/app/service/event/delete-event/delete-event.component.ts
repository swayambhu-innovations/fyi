import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { EventService } from '../service/event.service';
import { CancelBtnComponent } from "../../../../../../shared-ui/src/cancel-btn/cancel-btn.component";
import { DeleteBtnComponent } from "../../../../../../shared-ui/src/delete-btn/delete-btn.component";

@Component({
  selector: 'app-delete-event',
  standalone: true,
  imports: [CancelBtnComponent, DeleteBtnComponent],
  templateUrl: './delete-event.component.html',
  styleUrl: './delete-event.component.scss'
})
export class DeleteEventComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<DeleteEventComponent>,
    private eventService:EventService
  ) {
    console.log(data)
    this.count=data.cityLinked
  }
  count:number=0;
  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }
  deleteTax(): void {
    this.eventService.deleteEvent(this.data.eventId).then(()=>{
      this._bottomSheetRef.dismiss();
    })
  }
}
