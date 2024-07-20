import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddButtonComponent } from '../../../../../shared-ui/src/lib/add-button/add-button.component';
import { CatalogueService } from './service/catalogue.service';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from '../../sharedComponent/header-with-back/header-with-back.component';
@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [MatSlideToggleModule,AddButtonComponent,CommonModule,HeaderWithBackComponent],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss','../tax/tax.component.scss']
})
export class CatalogueComponent {
  constructor(
    private CatalogueService: CatalogueService,
    private _bottomSheet: MatBottomSheet,
    private router: Router
  ) {}

  catalogueList: any[] = [];

  ngOnInit() {
    this.CatalogueService.getCatalogueList().subscribe((data: any) => {
      this.catalogueList = data;
    });
  }

  addCatalogue(): void {
    this.router.navigate(['/create-catalogue']);
  }
  // openDelete(taxDetail: any): void {
  //   this._bottomSheet.open(DeleteTaxComponent, {
  //     data: taxDetail,
  //   });
  // }
  // editTax(taxDetail: any) {
  //   this._bottomSheet.open(AddTaxTypeComponent, {
  //     data: taxDetail,
  //   });
  // }
  updatedStatus(catalogueDetail: any) {
    catalogueDetail.active = !catalogueDetail.active;
    this.CatalogueService.addCatalogue(catalogueDetail);
  }
}
