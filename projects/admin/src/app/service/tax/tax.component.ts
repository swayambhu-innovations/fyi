import { Component } from '@angular/core';
import { NavbarComponent } from '../../sharedComponent/navbar/navbar.component';
import { NgFor } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddTaxTypeComponent } from './add-tax-type/add-tax-type.component';
import { AddButtonComponent } from '../../../../../shared-ui/src/lib/add-button/add-button.component';
import { TaxService } from './service/tax.service';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { DeleteTaxComponent } from './delete-tax/delete-tax.component';
import { LoadingService } from '../../../../../shared-ui/src/lib/spinner/loading.service';
@Component({
  selector: 'app-tax',
  standalone: true,
  imports: [
    NavbarComponent,
    NgFor,
    MatSlideToggleModule,
    DeleteTaxComponent,
    AddButtonComponent,
    AddTaxTypeComponent,
    MatButtonModule,
    MatBottomSheetModule,
  ],
  templateUrl: './tax.component.html',
  styleUrl: './tax.component.scss',
  providers: [TaxService],
})
export class TaxComponent {
  constructor(
    private taxService: TaxService,
    private _bottomSheet: MatBottomSheet,
    private LoadingService: LoadingService
  ) {}

  taxes: any[] = [];

  ngOnInit() {
    this.LoadingService.show();
    this.taxService.getTax().subscribe((data: any) => {
      this.taxes = data;
      this.LoadingService.hide();
    });
  }

  saveTax(): void {
    this._bottomSheet.open(AddTaxTypeComponent);
  }
  openDelete(taxDetail: any): void {
    this._bottomSheet.open(DeleteTaxComponent, {
      data: taxDetail,
    });
  }
  editTax(taxDetail: any) {
    this._bottomSheet.open(AddTaxTypeComponent, {
      data: taxDetail,
    });
  }
  updatedStatus(taxDetail: any) {
    taxDetail.active = !taxDetail.active;
    this.taxService.addTax(taxDetail);
  }
}
