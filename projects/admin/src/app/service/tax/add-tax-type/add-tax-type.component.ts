import { Component, Inject } from '@angular/core';
import { TaxService } from '../service/tax.service';
import { SaveBtnComponent } from '../../../../../../shared-ui/src/save-btn/save-btn.component';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastService} from '../../../../../../shared-ui/src/lib/toast/service/toast.service';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-tax-type',
  standalone: true,
  imports: [CancelBtnComponent, SaveBtnComponent, ReactiveFormsModule],
  templateUrl: './add-tax-type.component.html',
  styleUrl: './add-tax-type.component.scss',
  providers: [TaxService],
})
export class AddTaxTypeComponent {
  constructor(
    private taxService: TaxService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<AddTaxTypeComponent>,
    private ToastService:ToastService
  ) {}
  taxForm: FormGroup = new FormGroup({
    taxName: new FormControl('', Validators.required),
    taxRate: new FormControl('', Validators.required),
    taxType: new FormControl('percentage', Validators.required),
    active: new FormControl(true),
    taxId: new FormControl(''),
    eventLinked: new FormControl(0),
  });
  ngOnInit() {
    if (this.data && this.data.taxId) {
      this.taxForm.setValue(this.data);
    }
  }

  cancel() {
    this.ToastService.cancel('Cancel');

    this._bottomSheetRef.dismiss();
  }
  
  saveTax() {
    if (this.taxForm.valid) {
      this.taxService.addTax(this.taxForm.value).then(() => {
        if (this.data && this.data.taxId) {
          this.ToastService.showSuccess('Tax Updated');
        }
        else{
          this.ToastService.showSuccess('Tax Created');
        }
        this._bottomSheetRef.dismiss();
      });
    }
  }

}
