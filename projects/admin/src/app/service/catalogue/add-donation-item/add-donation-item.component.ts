import { Component } from '@angular/core';
import { ChangeDetectionStrategy, Inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  Storage,
} from '@angular/fire/storage';
import { CommonModule } from '@angular/common';

import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { SaveBtnComponent } from '../../../../../../shared-ui/src/save-btn/save-btn.component';
import { CatalogueService } from '../service/catalogue.service';
import { DonationItemService } from '../../donation/service/donation-item.service';
@Component({
  selector: 'app-add-donation-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CancelBtnComponent,
    SaveBtnComponent,
    CommonModule,
  ],
  templateUrl: './add-donation-item.component.html',
  styleUrl: './add-donation-item.component.scss',
})
export class AddDonationItemComponent {
  isImgSizeValid = false;
  
  donationItems: any[] = [];
  selectedDonationItem:any

  donationItemForm: FormGroup = new FormGroup({
    itemId: new FormControl(''),
    active: new FormControl(true),
    reward: new FormControl(0, Validators.required),
    catalogueId: new FormControl(this.data.catalogueId),
    categoryId: new FormControl(this.data.categoryId),
    subCategoryId: new FormControl(this.data.subCategoryId),
    donationItemId:new FormControl(''),

  });

  constructor(
    private CatalogueService: CatalogueService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<AddDonationItemComponent>,
    private DonationItemService: DonationItemService
  ) {
    console.log(data)
    this.donationItemForm.patchValue({catalogueId:data.catalogueId,categoryId:data.categoryId,subCategoryId:data.subCategoryId})
  }

  ngOnInit() {
    this.getDonationItemList()
    if (this.data && this.data.itemId) {
      console.log(this.data);
      this.donationItemForm.setValue(this.data);
    }
  }

  cancel() {
    this._bottomSheetRef.dismiss();
  }

  getDonationItemList() {
    this.DonationItemService.getDonationItems().subscribe((data: any) => {
      data.map((item: any) => {
        if (item['active']) {
          this.donationItems.push(item);
        }
      });
      this.selectedDonationItem = this.donationItems[0].itemId;
    });
  }

  saveSubCategory() {
    if (this.donationItemForm.valid) {
      this.CatalogueService.addDonationInSubcategory(this.donationItemForm.value).then(
        () => {
          this._bottomSheetRef.dismiss();
        }
      );
    }
  }
}
