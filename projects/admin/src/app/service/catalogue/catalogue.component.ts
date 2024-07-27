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
import { CreateCatalogueComponent } from './create-catalogue/create-catalogue.component';
import { DeleteBottomSheetComponent } from '../../sharedComponent/delete-bottom-sheet/delete-bottom-sheet.component';
@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    AddButtonComponent,
    CommonModule,
    HeaderWithBackComponent,
  ],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss', '../tax/tax.component.scss'],
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
  editCatalogue(catalogue: any) {
    this.CatalogueService.currentCatalogue = catalogue;
    this.router.navigate(['/create-catalogue', catalogue.id]);
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

  async deleteCatalogue(catalogue: any) {
    let catalogueInArea = 5;

    const bottomSheetRef = this._bottomSheet.open(DeleteBottomSheetComponent, {
      data: {
        title: 'Catalogue',
        description: `linked with ${catalogueInArea} areas`,
      },
    });

    bottomSheetRef.afterDismissed().subscribe(async (result) => {
      console.log('Bottom sheet has been dismissed', result);
      if (result && catalogueInArea === 0) {
        console.log(result);
        await this.CatalogueService.delete(`service-catalogue/${catalogue.id}`);
      }
      else{
        console.log('Catalogue is linked with areas');
      }
    });
  }
}
