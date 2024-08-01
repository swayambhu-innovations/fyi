import { Component, Inject } from '@angular/core';
import { DeleteBtnComponent } from '../../../../../../shared-ui/src/delete-btn/delete-btn.component';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TaxService } from '../service/tax.service';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from '../../../../../../shared-ui/src/lib/spinner/loading.service';
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
    private taxService:TaxService,
    private LoadingService:LoadingService
  ) {
    console.log(data)
    this.count=data.eventLinked
  }
  count:number=0;
  isDeleteDisabled =false

  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }
  ngOnInit(){
    this.getTaxOnVariant(this.data.taxId)
  }
  async getTaxOnVariant(taxId:any){
    this.LoadingService.show()
    await this.taxService.fetchDocs(`events`).subscribe((eventList:any)=>{
      eventList.map(async(event:any)=>{
        await this.taxService.fetchDocs(`events/${event.eventId}/slab-variant`).subscribe((slabList:any)=>{
          slabList.map(async (slab:any)=>{
            await this.taxService.fetchDocs(`events/${event.eventId}/slab-variant/${slab.slabId}/variants`).subscribe((variantList:any)=>{
                console.log(variantList)
                console.log(taxId)
                variantList.map((variant: any) => {
                  if (variant.taxType === taxId) {
                    this.count++;
                    this.isDeleteDisabled = true;
                  }
                });
            })
          })
        })
      })
    })
    setTimeout(()=>{
      this.LoadingService.hide();

    },3000)

  }

  deleteTax(): void {
    this.taxService.deleteTax(this.data.taxId).then(()=>{
      this._bottomSheetRef.dismiss();
    })
  }
}
