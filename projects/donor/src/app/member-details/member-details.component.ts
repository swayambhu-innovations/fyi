import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { SaveBtnComponent } from "../../../../shared-ui/src/save-btn/save-btn.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [ReactiveFormsModule, SaveBtnComponent,CommonModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss'
})
export class MemberDetailsComponent {
  profileImageSrc: string = '/assets/member_detail/default.svg';
  panuploadSuccess = false;
  aadharuploadSuccess=false;
  userTabCount: number = 3; // Default to 5 tabs
  tabs: number[] = [];
  activeTab: number = 0;
  constructor() {
    this.generateTabs();
  }
  generateTabs(): void {
    this.tabs = Array.from({ length: this.userTabCount }, (_, i) => i + 1);
    this.setActiveTab(0);
  }
  setActiveTab(index: number): void {
    this.activeTab = index;
  }
  //profile
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.profileImageSrc = URL.createObjectURL(file);
    }
   
  }
  // reactive form 
  memberForm : FormGroup = new FormGroup({
    Name:new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      mobileNo: new FormControl('',[ Validators.required, Validators.pattern(RegExp('[0-9]{10}'))]),
      Aadharnumber: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp('[0-9]{12}')),
      ]),
      Adharimages: new FormControl('', Validators.required),
      Pannumber: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}')),
      ]),
      panimages: new FormControl('', Validators.required),
    });
  //upload Aadhar and pancard
  triggerFileInputAadhar(): void {
    const fileInput = document.getElementById('fileInputAadhar') as HTMLInputElement;
    fileInput.click();
  }
  triggerFileInputPan(): void {
    const fileInput = document.getElementById('fileInputPan') as HTMLInputElement;
    fileInput.click();
  }
  onPanUpload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.panuploadSuccess = true;
      //setTimeout(() => this.panuploadSuccess = false, 3000);
    }
  }
  onAadharUpload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.aadharuploadSuccess = true;
      //setTimeout(() => this.aadharuploadSuccess = false, 3000);
    }
  }
  saveMemberDetail() {
    if (this.memberForm.valid) {
      console.log('Form Submitted', this.memberForm.value);
      if (this.activeTab < this.tabs.length - 1) {
        this.setActiveTab(this.activeTab + 1);
      } else {
        console.log('Proceed to the next step.');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
