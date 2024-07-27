import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ReactiveFormsModule } from '@angular/forms';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { SaveBtnComponent } from '../../../../../../shared-ui/src/save-btn/save-btn.component';
import { EventService } from '../service/event.service';
import { TaxService } from '../../tax/service/tax.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-addvarient',
  standalone: true,
  imports: [ReactiveFormsModule,CancelBtnComponent,SaveBtnComponent,CommonModule],
  templateUrl: './addvarient.component.html',
  styleUrls: ['./addvarient.component.scss','../../donation/add-donation-item/add-donation-item.component.scss']
})
export class AddvarientComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<AddvarientComponent>,
    private EventService:EventService,
    private TaxService: TaxService
  ) {}
  variantForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    taxType: new FormControl('', Validators.required),
    taxCalc: new FormControl('inclusive', Validators.required),
    totalTicket: new FormControl('', [Validators.required, Validators.min(1)]),
    reward: new FormControl('', [Validators.required, Validators.min(0)]),
    active: new FormControl(true),
    variantId: new FormControl(''),
  });
  ngOnInit() {
    this.getTaxTypes();
    console.log('add tax type component');
    if (this.data && this.data.taxId) {
      console.log(this.data);
      this.variantForm.setValue(this.data);
    }
  }

  cancel() {
    this._bottomSheetRef.dismiss();
  }
  
  saveTax() {
    if (this.variantForm.valid) {
      this._bottomSheetRef.dismiss(this.variantForm.value);

    }
  }

taxTypes: any[] = [];
selectedVariant: any;
  getTaxTypes() {
    this.TaxService.getTax().subscribe((data: any) => {
      data.map((item: any) => {
        console.log(data)
        if (item['active']) {
          this.taxTypes.push(item);
        }
      });
      this.selectedVariant = this.taxTypes[0].taxId;
    });
  }
}
