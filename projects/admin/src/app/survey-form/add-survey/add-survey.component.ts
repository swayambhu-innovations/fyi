import { Component } from '@angular/core';
import { ChangeDetectionStrategy, Inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { CancelBtnComponent } from '../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { SaveBtnComponent } from '../../../../../shared-ui/src/save-btn/save-btn.component';
import { GlobalServiceService } from '../../globalService/global-service.service';

@Component({
  selector: 'app-add-survey',
  standalone: true,
  imports: [ReactiveFormsModule,
    CancelBtnComponent,
    SaveBtnComponent,
    CommonModule,],
  templateUrl: './add-survey.component.html',
  styleUrl: './add-survey.component.scss'
})
export class AddSurveyComponent {
  isImgSizeValid = false;

  addSurveyForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    coinReward: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    id: new FormControl(''),
    photoURL: new FormControl('', Validators.required),
    active: new FormControl(true),
    
  });

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<AddSurveyComponent>,
    private Storage: Storage,
    private GlobalService: GlobalServiceService
  ) {
    // if (data.subCategoryId) {
    //   this.addSurveyForm.setValue(data);
    // } else {
    //   this.addSurveyForm.patchValue({
    //     catalogueId: data.catalogueId,
    //     categoryId: data.categoryId,
    //   });
    // }
  }

  async changePhoto(e: any) {
    const file = e.target.files[0];
    const fileSizeKB = file.size / 1024;
    const maxSizeKB = 500;
    this.isImgSizeValid = false;

    const date = new Date();
    const timestamp = date.getTime();
    const fileName = `${timestamp}.${file.name.split('.').pop()}`;

    const filePath = `surveyBanner/${fileName}`;
    await uploadBytesResumable(ref(this.Storage, filePath), file);
    const fileUrl = await getDownloadURL(ref(this.Storage, filePath));
    this.addSurveyForm.patchValue({
      photoURL: fileUrl,
    });
  }

  ngOnInit() {}

  cancel() {
    this._bottomSheetRef.dismiss();
  }

  removeImg() {
    this.addSurveyForm.patchValue({ photoURL: null });
  }

  addSurvey() {
    if (this.addSurveyForm.valid) {
      this.GlobalService.addDoc('surveys',this.addSurveyForm.value).then(
        () => {
          this._bottomSheetRef.dismiss();
        }
      );
    }
  }
}
