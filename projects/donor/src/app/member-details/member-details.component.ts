import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SaveBtnComponent } from '../../../../shared-ui/src/save-btn/save-btn.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MemberDetailService } from './member-detail.service';
import { HeaderWithBackComponent } from '../sharedComponent/header-with-back/header-with-back.component';
import { EventService } from '../home/event/event.service';
import { DataProviderService } from '../auth/service/data-provider.service';
import { ToastService } from '../../../../shared-ui/src/lib/toast/service/toast.service';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import { LoadingService } from '../../../../shared-ui/src/lib/spinner/loading.service';
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
  @Input() disabled: boolean = false;

  profileImageSrc: string =
    'https://firebasestorage.googleapis.com/v0/b/fyi1-aa2c2.appspot.com/o/donorProfile%2Fimages.jfif?alt=media&token=bd4b3393-3582-4f4a-a8f6-cdcea90528ac';
  panuploadSuccess = false;
  aadharuploadSuccess = false;
  userTabCount: any = 3;
  tabs: number[] = [];
  activeTab: number = 0;
  membersData: any[] = [];
  object: any;
  isDetailFilled: boolean = true;
  constructor(
    private router: Router,
    private memberservice: MemberDetailService,
    public EventService: EventService,
    private DataProviderService: DataProviderService,
    private ToastService: ToastService,
    private storage: Storage,
    private LoadingService: LoadingService
  ) {
    this.generateTabs();
    this.initializeMembersData();
    if (this.DataProviderService.loggedIn) {
      let bookingDetails = this.EventService.bookingDetails();
      bookingDetails['customer'] =
        this.DataProviderService.currentUser?.userData;
      let taxId = this.EventService.bookingDetails()['variant'].taxType;

      this.EventService.fetchDoc(`tax-types/${taxId}`).subscribe((tax: any) => {
        let bookingDetails = this.EventService.bookingDetails();
        bookingDetails['tax'] = tax;
      });
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
    if (this.activeTab != index) {
      console.log(this.memberForm.value);
      this.membersData[this.activeTab] = this.memberForm.value;
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
      profileImageSrc: this.profileImageSrc,
    };
  }

  memberForm: FormGroup = new FormGroup({
    profileImageSrc: new FormControl(this.profileImageSrc),
    Name: new FormControl('', Validators.required),
    gender: new FormControl('Male', Validators.required),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.pattern(RegExp('[0-9]{10}')),
    ]),
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

  onFileSelected(event: any): void {
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files[0]) {
    //   const file = input.files[0];
    //   this.profileImageSrc = URL.createObjectURL(file);
    //   this.memberForm.value.profileImageSrc = this.profileImageSrc;
    //   this.membersData[this.activeTab].profileImageSrc = this.profileImageSrc;
    // }
    

    this.LoadingService.show();
    this.uploadPhoto(event).then((fileUrl) => {
      this.memberForm.value.profileImageSrc = fileUrl;
      this.membersData[this.activeTab].profileImageSrc = fileUrl;
        })
    .catch((error) => {
      console.error('Error uploading Aadhar image: ', error);
    })
    .finally(() => {
      this.LoadingService.hide();
    });
  }

  async uploadPhoto(e: any) {
    const file = e.target.files[0];
    const date = new Date();
    const timestamp = date.getTime();
    const fileName = `${timestamp}.${file.name.split('.').pop()}`;
    const filePath = `memberProfile/${fileName}`;
    await uploadBytesResumable(ref(this.storage, filePath), file);
    const fileUrl = await getDownloadURL(ref(this.storage, filePath));
    return fileUrl;
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
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files[0]) {
    //   const file = input.files[0];
    //   this.memberForm.value.panimages = URL.createObjectURL(file);
    // }
   


    this.LoadingService.show();
    this.uploadPhoto(event).then((fileUrl) => {
      this.memberForm.value.panimages = fileUrl;
    })
    .catch((error) => {
      console.error('Error uploading Aadhar image: ', error);
    })
    .finally(() => {
      this.LoadingService.hide();
    });
  }

  onAadharUpload(event: any) {
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files[0]) {
    //   const file = input.files[0];
    //   this.memberForm.value.Adharimages = URL.createObjectURL(file);
    // }
    this.LoadingService.show();
    this.uploadPhoto(event).then((fileUrl) => {
      this.memberForm.value.Adharimages = fileUrl;
    })
    .catch((error) => {
      console.error('Error uploading Aadhar image: ', error);
    })
    .finally(() => {
      this.LoadingService.hide();
    });
  }

  isMembersDataValid(): { isValid: boolean; message: string } {
    for (let i = 0; i < this.membersData.length; i++) {
      const member = this.membersData[i];

      if (!member.profileImageSrc) {
        return {
          isValid: false,
          message: `Profile image is missing for member ${i + 1}`,
        };
      }
      if (!member.Name) {
        return {
          isValid: false,
          message: `Name is missing for member ${i + 1}`,
        };
      }
      if (!member.gender) {
        return {
          isValid: false,
          message: `Gender is missing for member ${i + 1}`,
        };
      }
      if (!member.mobileNo) {
        return {
          isValid: false,
          message: `Mobile number is missing for member ${i + 1}`,
        };
      }
      if (!member.Aadharnumber) {
        return {
          isValid: false,
          message: `Aadhar number is missing for member ${i + 1}`,
        };
      }
      if (!member.Adharimages) {
        return {
          isValid: false,
          message: `Aadhar image is missing for member ${i + 1}`,
        };
      }
      if (!member.Pannumber) {
        return {
          isValid: false,
          message: `PAN number is missing for member ${i + 1}`,
        };
      }
      if (!member.panimages) {
        return {
          isValid: false,
          message: `PAN image is missing for member ${i + 1}`,
        };
      }

      const mobileNoPattern = /^[0-9]{10}$/;
      if (!mobileNoPattern.test(member.mobileNo)) {
        return {
          isValid: false,
          message: `Invalid mobile number for member ${i + 1}`,
        };
      }

      const aadharPattern = /^[0-9]{12}$/;
      if (!aadharPattern.test(member.Aadharnumber)) {
        return {
          isValid: false,
          message: `Invalid Aadhar number for member ${i + 1}`,
        };
      }

      const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panPattern.test(member.Pannumber)) {
        return {
          isValid: false,
          message: `Invalid PAN number for member ${i + 1}`,
        };
      }
    }

    return { isValid: true, message: 'All members data are valid' };
  }

  saveMemberDetail() {
    this.membersData[this.activeTab] = this.memberForm.value;

    const validationResult = this.isMembersDataValid();
    if (!validationResult.isValid) {
      alert(validationResult.message);
      return;
    } else {
      console.log('Form submitted:', this.membersData);

      let variantPrice = this.EventService.bookingDetails()['variant'].price;
      let totalMember = this.EventService.bookingDetails()['totalMember'];
      let totalPrice = 0;
      let taxAmount = 0;
      let priceWithOutTax = 0;
      if (
        this.EventService.bookingDetails()['variant'].taxCalc != 'inclusive'
      ) {
        let tax: any = this.EventService.bookingDetails()['tax'];
        console.log(tax);

        if (tax.taxType == 'percentage') {
          priceWithOutTax = variantPrice * totalMember;
          taxAmount = (priceWithOutTax * tax.taxRate) / 100;
          totalPrice = priceWithOutTax + taxAmount;
        } else {
          priceWithOutTax = variantPrice * totalMember;
          taxAmount = tax.taxRate;
          totalPrice = (variantPrice + taxAmount) * totalMember;
        }
      } else {
        totalPrice = variantPrice * totalMember;
        priceWithOutTax = variantPrice * totalMember;
      }
      let bookingDetails = this.EventService.bookingDetails();
      bookingDetails['paymentDetail'] = {
        variantPrice: variantPrice,
        totalMember: totalMember,
        totalPrice: totalPrice,
        paymentStatus: 'pending',
        taxAmount: taxAmount,
        priceWithOutTax: priceWithOutTax,
      };
      bookingDetails['memberDetail'] = this.membersData;
      this.EventService.bookingDetails.set(bookingDetails);
      this.memberservice
        .addInbooking()
        .then((res: any) => {
          this.router.navigate(['payment', res.bookingId]);
        })
        .catch((error) => {
          console.error('Error creating coupon: ', error);
        });
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
