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
import { DeleteDonationItemComponent } from './delete-donation-item/delete-donation-item.component';
import { AddDonationItemComponent } from './add-donation-item/add-donation-item.component';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { DonationItemService } from './service/donation-item.service';
import { AddButtonComponent } from '../../../../../shared-ui/src/lib/add-button/add-button.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [MatExpansionModule, ReactiveFormsModule, CommonModule,AddButtonComponent,MatSlideToggleModule,MatBottomSheetModule,MatButtonModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss',
})
export class DonationComponent {
  constructor(
    private _bottomSheet: MatBottomSheet,
    private DonationItemService: DonationItemService
  ) {}
  readonly panelOpenState = signal(false);

  donationItems: any[] = [];
  ngOnInit() {
    this.DonationItemService.getDonationItems().subscribe((data: any) => {
      this.donationItems = data;
      console.log(data)
    });
  }

  addDonationItem(): void {
    this._bottomSheet.open(AddDonationItemComponent);
  }

  deleteDonationItem(donationDetail: any): void {
    this._bottomSheet.open(DeleteDonationItemComponent, {
      data: donationDetail,
    });
  }

  editDonationItem(donationDetail: any) {
    this._bottomSheet.open(AddDonationItemComponent, {
      data: donationDetail,
    });
  }

  updatedStatus(donationDetail: any) {
    donationDetail.active = !donationDetail.active;
    this.DonationItemService.addDonationItem(donationDetail);
  }
}
