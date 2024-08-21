import { Component, Input } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { SaveBtnComponent } from '../../../../shared-ui/src/save-btn/save-btn.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MemberDetailService } from './member-detail.service';
import { HeaderWithBackComponent } from '../sharedComponent/header-with-back/header-with-back.component';
import { EventService } from '../home/event/event.service';
import { DataProviderService } from '../auth/service/data-provider.service';
import { ToastService } from '../../../../shared-ui/src/lib/toast/service/toast.service';
@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SaveBtnComponent,
    CommonModule,
    HeaderWithBackComponent,
  ],
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent {
  @Input() disabled: boolean=false;

  profileImageSrc: string ="https://firebasestorage.googleapis.com/v0/b/fyi1-aa2c2.appspot.com/o/donorProfile%2Fimages.jfif?alt=media&token=bd4b3393-3582-4f4a-a8f6-cdcea90528ac"
  panuploadSuccess = false;
  aadharuploadSuccess = false;
  userTabCount: any = 3;
  tabs: number[] = [];
  activeTab: number = 0;
  membersData: any[] = [];
  object: any;

  constructor(
    private router: Router,
    private memberservice: MemberDetailService,
    public EventService: EventService,
    private DataProviderService: DataProviderService,
    private ToastService:ToastService
  ) {
    this.generateTabs();
    this.initializeMembersData();
    if (this.DataProviderService.loggedIn) {

      let bookingDetails = this.EventService.bookingDetails();
      bookingDetails['customer'] = this.DataProviderService.currentUser?.userData;
      let taxId = this.EventService.bookingDetails()['variant'].taxType
      
      this.EventService.fetchDoc(`tax-types/${taxId}`).subscribe(
        (tax: any) => {
          let bookingDetails = this.EventService.bookingDetails();
      bookingDetails['tax'] = tax
        }
      );
      this.EventService.bookingDetails.set(bookingDetails);
    } else {
      this.ToastService.showError('Please Login First');
      
      this.router.navigate(['login']);
    }
  }
  ngOnInit() {
    this.userTabCount = this.EventService.bookingDetails()['totalMember'];
  }

  initializeMembersData(): void {
    this.userTabCount = this.EventService.bookingDetails()['totalMember'];
    for (let i = 0; i < this.userTabCount; i++) {
      this.membersData.push(this.createEmptyMemberData());
    }
  }
  generateTabs(): void {
    this.userTabCount = this.EventService.bookingDetails()['totalMember'];
    this.tabs = Array.from({ length: this.userTabCount }, (_, i) => i + 1);
    this.setActiveTab(0);
  }
  setActiveTab(index: number): void {
    if (this.activeTab !== index) {
      this.membersData[this.activeTab] = {
        ...this.memberForm.value,
        profileImageSrc: this.profileImageSrc,
      };
      this.activeTab = index;
      console.log(this.membersData[this.activeTab]);
      this.memberForm.setValue(this.membersData[this.activeTab]);
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
      profileImageSrc: 'https://firebasestorage.googleapis.com/v0/b/fyi1-aa2c2.appspot.com/o/donorProfile%2Fimages.jfif?alt=media&token=bd4b3393-3582-4f4a-a8f6-cdcea90528ac',
    };
  }





  memberForm: FormGroup = new FormGroup({   
    profileImageSrc: new FormControl(''),
    Name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    mobileNo: new FormControl('', [Validators.required,Validators.pattern(RegExp('[0-9]{10}')),]),
    Aadharnumber: new FormControl('', [Validators.required,Validators.pattern(RegExp('[0-9]{12}')),]),
    Adharimages: new FormControl('', Validators.required),
    Pannumber: new FormControl('', [Validators.required,Validators.pattern(RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}')),]),
    panimages: new FormControl('', Validators.required),
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
    const fileInput = document.getElementById(
      'fileInputAadhar'
    ) as HTMLInputElement;
    fileInput.click();
  }

  triggerFileInputPan(): void {
    const fileInput = document.getElementById(
      'fileInputPan'
    ) as HTMLInputElement;
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
      this.membersData[this.activeTab] = {
        ...this.memberForm.value,
        profileImageSrc: this.profileImageSrc,
      };
      if (this.activeTab < this.tabs.length - 1) {
        this.setActiveTab(this.activeTab + 1);
      } else {
        let variantPrice = this.EventService.bookingDetails()['variant'].price
        let totalMember  =this.EventService.bookingDetails()['totalMember'];
        let totalPrice = 0;
        let taxAmount = 0;
        let priceWithOutTax=0
        if(this.EventService.bookingDetails()['variant'].taxCalc!="inclusive"){
            let tax:any = this.EventService.bookingDetails()['tax']
            console.log(tax)
           
            if(tax.taxType=='percentage'){
               priceWithOutTax = (variantPrice*totalMember)
              taxAmount = (priceWithOutTax*tax.taxRate)/100
                totalPrice = priceWithOutTax + taxAmount
            }
            else{
              priceWithOutTax = variantPrice*totalMember
              taxAmount=tax.taxRate
              totalPrice = (variantPrice+taxAmount) * totalMember
            }
        }
        else{
            totalPrice = variantPrice*totalMember
            priceWithOutTax=variantPrice*totalMember
        }
        let bookingDetails = this.EventService.bookingDetails();
        bookingDetails['paymentDetail'] = {
          variantPrice: variantPrice,
          totalMember: totalMember,
          totalPrice: totalPrice,
          paymentStatus:'pending',
          taxAmount:taxAmount,
          priceWithOutTax:priceWithOutTax
        }
        bookingDetails['memberDetail'] = this.membersData
                this.EventService.bookingDetails.set(bookingDetails);
        this.memberservice
          .addInbooking()
          .then((res:any) => {
            this.router.navigate(['payment',res.bookingId]);
                    })
          .catch((error) => {
            console.error('Error creating coupon: ', error);
          });

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
    const fileInputAadhar = document.getElementById(
      'fileInputAadhar'
    ) as HTMLInputElement;
    const fileInputPan = document.getElementById(
      'fileInputPan'
    ) as HTMLInputElement;
    if (fileInputAadhar) fileInputAadhar.value = '';
    if (fileInputPan) fileInputPan.value = '';
  }
}


