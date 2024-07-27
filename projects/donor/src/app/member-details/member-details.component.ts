import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaveBtnComponent } from "../../../../shared-ui/src/save-btn/save-btn.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MemberDetailService } from './member-detail.service';
import { HeaderWithBackComponent } from "../sharedComponent/header-with-back/header-with-back.component";
@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [ReactiveFormsModule, SaveBtnComponent, CommonModule, HeaderWithBackComponent],
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent {
  profileImageSrc: string = '/assets/member_detail/default.svg'; 
  panuploadSuccess = false;
  aadharuploadSuccess = false;
  userTabCount: number = 1; 
  tabs: number[] = [];
  activeTab: number = 0;
  membersData: any[] = []; 
  object: any;

  constructor(private router: Router,private memberservice:MemberDetailService) {
    this.generateTabs();
    this.initializeMembersData();
  }

  
  initializeMembersData(): void {
    for (let i = 0; i < this.userTabCount; i++) {
      this.membersData.push(this.createEmptyMemberData());
    }
  }

  
  createEmptyMemberData(): any {
    return {
      Name: '',
      gender: '',
      mobileNo: '',
      Aadharnumber: '',
      Adharimages: '',
      Pannumber: '',
      panimages: '',
      profileImageSrc: '/assets/member_detail/default.svg'
    };
  }

  generateTabs(): void {
    this.tabs = Array.from({ length: this.userTabCount }, (_, i) => i + 1);
    this.setActiveTab(0);
  }

  setActiveTab(index: number): void {
    if (this.activeTab !== index) {
    
      this.membersData[this.activeTab] = { ...this.memberForm.value, profileImageSrc: this.profileImageSrc };
      this.activeTab = index;
  
      this.resetForm();
    }
  }

  
  memberForm: FormGroup = new FormGroup({
    Name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    mobileNo: new FormControl('', [Validators.required, Validators.pattern(RegExp('[0-9]{10}'))]),
    Aadharnumber: new FormControl('', [Validators.required, Validators.pattern(RegExp('[0-9]{12}'))]),
    Adharimages: new FormControl('', Validators.required),
    Pannumber: new FormControl('', [Validators.required, Validators.pattern(RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}'))]),
    panimages: new FormControl('', Validators.required)
  });

  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.profileImageSrc = URL.createObjectURL(file);
      this.membersData[this.activeTab].profileImageSrc = this.profileImageSrc;
    }
  }

  
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

    }
  }

  onAadharUpload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.aadharuploadSuccess = true;
    }
  }

  saveMemberDetail() {
    if (this.memberForm.valid) {
    
      this.membersData[this.activeTab] = { ...this.memberForm.value, profileImageSrc: this.profileImageSrc };
      if (this.activeTab < this.tabs.length - 1) {
        this.setActiveTab(this.activeTab + 1);
      } else {
  
        console.log('All Member Data:', this.membersData);
        this.memberservice.createCoupon({myArray:this.membersData})
        .then(() => {
          console.log('Coupon created successfully');
        })
        .catch(error => {
          console.error('Error creating coupon: ', error);
        });
      
        this.router.navigate(['event-payment']);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  
  
  resetForm(): void {
    this.memberForm.reset(); 
    this.profileImageSrc = '/assets/member_detail/default.svg';
    this.panuploadSuccess = false;
    this.aadharuploadSuccess = false;
    const fileInputAadhar = document.getElementById('fileInputAadhar') as HTMLInputElement;
    const fileInputPan = document.getElementById('fileInputPan') as HTMLInputElement;
    if (fileInputAadhar) fileInputAadhar.value = ''; 
    if (fileInputPan) fileInputPan.value = '';
  }
}
