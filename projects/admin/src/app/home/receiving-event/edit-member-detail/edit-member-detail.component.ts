import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CancelBtnComponent } from "../../../../../../shared-ui/src/cancel-btn/cancel-btn.component";
import { SaveBtnComponent } from "../../../../../../shared-ui/src/save-btn/save-btn.component";
import { ReceivingEventService } from '../../services/receiving-event.service';
interface Member {
  name: string;
  aadhaar: string;
  gender: string;
  contact: string;
}
@Component({
  selector: 'app-edit-member-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CancelBtnComponent, SaveBtnComponent],
  templateUrl: './edit-member-detail.component.html',
  styleUrl: './edit-member-detail.component.scss'
})
export class EditMemberDetailComponent {
  editMemberForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<EditMemberDetailComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public member: Member, 
    private receivingEventService:ReceivingEventService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { member: Member, userId: string, bookingId: string, memberIndex: number }
  ) {
    this.editMemberForm = this.fb.group({
      Name: [this.member.name, Validators.required],
      Aadharnumber: [this.member.aadhaar, [Validators.required, Validators.pattern(/^\d{12}$/)]],
      gender: [this.member.gender, Validators.required],
      mobileNo: [this.member.contact, [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit() {}

  // save() {
  //   console.log("asdfgh")
  //   if (this.editMemberForm.valid) {
  //     console.log("sdfghj")
  //     this.bottomSheetRef.dismiss(this.editMemberForm.value);
  //   }
  // }
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
