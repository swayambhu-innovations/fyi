import { Component, Inject } from '@angular/core';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { DeleteBtnComponent } from '../../../../../../shared-ui/src/delete-btn/delete-btn.component';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-delete-slab',
  standalone: true,
  imports: [CancelBtnComponent, DeleteBtnComponent],
  templateUrl: './delete-slab.component.html',
  styleUrl: './delete-slab.component.scss',
})
export class DeleteSlabComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<DeleteSlabComponent>,
    private eventService: EventService
  ) {
    console.log(data);
  }
  count: number = 0;
  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }
  async deleteslabvarient() {
    await this.eventService
      .deleteSlab(
        `events/${this.data.eventId}/slab-variant/${this.data.slabId}`
      )
      .then(() => {
        this._bottomSheetRef.dismiss();
      });
      return true;

    // this.eventService.deleteSlab(this.data.slabId).then(()=>{
    //   this._bottomSheetRef.dismiss();
    // })
  }
}
