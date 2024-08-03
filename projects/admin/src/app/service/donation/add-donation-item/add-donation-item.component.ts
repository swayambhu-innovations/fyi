import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  signal,
} from '@angular/core';
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
import { DonationItemService } from '../service/donation-item.service';
import {CancelBtnComponent} from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import {SaveBtnComponent} from '../../../../../../shared-ui/src/save-btn/save-btn.component';
import { LoadingService } from '../../../../../../shared-ui/src/lib/spinner/loading.service';

@Component({
  selector: 'app-add-donation-item',
  standalone: true,
  imports: [ReactiveFormsModule,CancelBtnComponent,SaveBtnComponent,CommonModule],
  templateUrl: './add-donation-item.component.html',
  styleUrl: './add-donation-item.component.scss',
})
export class AddDonationItemComponent {
  isImgSizeValid = false;

  donationItemForm: FormGroup = new FormGroup({
    itemName: new FormControl('', Validators.required),
    itemId: new FormControl(''),
    itemType: new FormControl('weight'),
    photoURL: new FormControl('',Validators.required),
    active: new FormControl(true),
  });

  constructor(
    private DonationItemService: DonationItemService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<AddDonationItemComponent>,
    private Storage: Storage,
    private LoadingService:LoadingService
  ) {}

  async changePhoto(e: any) {
    this.LoadingService.show();
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

    const filePath = `donotionItem/${fileName}`;
    await uploadBytesResumable(ref(this.Storage, filePath), file);
    const fileUrl = await getDownloadURL(ref(this.Storage, filePath));
    this.donationItemForm.patchValue({
      photoURL: fileUrl,
    });
    this.LoadingService.hide();
  }

  ngOnInit() {
    if (this.data && this.data.itemId) {
      this.donationItemForm.setValue(this.data);
    }
  }

  cancel() {
    this._bottomSheetRef.dismiss();
  }

  removeImg(){
    this.donationItemForm.patchValue({photoURL:null})
  }

  saveDonationItem() {
    if (this.donationItemForm.valid) {
      this.DonationItemService.addDonationItem(
        this.donationItemForm.value
      ).then(() => {
        this._bottomSheetRef.dismiss();
      });
    }
  }
}
