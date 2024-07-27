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
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CancelBtnComponent,
    SaveBtnComponent,
    CommonModule,
  ],
  templateUrl: './add-category.component.html',
  styleUrls: [
    './add-category.component.scss',
    '../../donation/add-donation-item/add-donation-item.component.scss',
  ],
})
export class AddCategoryComponent {
  isImgSizeValid = false;

  categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    photoURL: new FormControl('', Validators.required),
    active: new FormControl(true),
    catalogueId: new FormControl(this.data.id),
    categoryId: new FormControl(''),
  });

  constructor(
    private CatalogueService: CatalogueService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<AddCategoryComponent>,
    private Storage: Storage
  ) {
    if (data.categoryId) {
      this.categoryForm.setValue(data);
    } else {
      this.categoryForm.patchValue({ catalogueId: data.id });
    }
  }

  async changePhoto(e: any) {
    const file = e.target.files[0];
    const fileSizeKB = file.size / 1024;
    const maxSizeKB = 500;

    // if (fileSizeKB > maxSizeKB) {
    //   this.isImgSizeValid = true;
    //   return;
    // } else {
    this.isImgSizeValid = false;

    const date = new Date();
    const timestamp = date.getTime();
    const fileName = `${timestamp}.${file.name.split('.').pop()}`;

    const filePath = `category/${fileName}`;
    await uploadBytesResumable(ref(this.Storage, filePath), file);
    const fileUrl = await getDownloadURL(ref(this.Storage, filePath));
    this.categoryForm.patchValue({
      photoURL: fileUrl,
    });
  }

  ngOnInit() {}

  cancel() {
    this._bottomSheetRef.dismiss();
  }

  removeImg() {
    this.categoryForm.patchValue({ photoURL: null });
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      this.CatalogueService.addCategory(this.categoryForm.value).then(() => {
        this._bottomSheetRef.dismiss();
      });
    }
  }
}
