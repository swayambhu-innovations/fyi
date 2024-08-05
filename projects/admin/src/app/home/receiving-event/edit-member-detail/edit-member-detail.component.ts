import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CancelBtnComponent } from "../../../../../../shared-ui/src/cancel-btn/cancel-btn.component";
import { SaveBtnComponent } from "../../../../../../shared-ui/src/save-btn/save-btn.component";
import { ReceivingEventService } from '../../services/receiving-event.service';
interface Member {
  Name: string;
  Aadharnumber: string;
  gender: string;
  mobileNo: string;
}
@Component({
  selector: 'app-edit-member-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CancelBtnComponent,
    SaveBtnComponent,
  ],
  templateUrl: './edit-member-detail.component.html',
  styleUrl: './edit-member-detail.component.scss',
})
export class EditMemberDetailComponent {
  editMemberForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<EditMemberDetailComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public member: Member,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { member: Member, userId: string, bookingId: string, memberIndex: number },
    private receivingEventService:ReceivingEventService
  ) {
    console.log(data.member)
    this.editMemberForm = this.fb.group({
      Name: [data.member.Name, Validators.required],
      Aadharnumber: [data.member.Aadharnumber, [Validators.required, Validators.pattern(/^\d{12}$/)]],
      gender: [data.member.gender, Validators.required],
      mobileNo: [data.member.mobileNo
        , [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit() {}

  
  async save() {
    if (this.editMemberForm.valid) {
      const updatedMember = this.editMemberForm.value;
      await this.receivingEventService.updateMember(this.data.userId, this.data.bookingId, this.data.memberIndex, updatedMember);
      this.bottomSheetRef.dismiss(updatedMember);
    }
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }
}
