import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataProviderService } from '../service/data-provider.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { RecaptchaVerifier } from '@angular/fire/auth';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import { HeaderWithBackComponent } from '../../sharedComponent/header-with-back/header-with-back.component';
import { SaveBtnComponent } from '../../../../../shared-ui/src/save-btn/save-btn.component';
// declare var cordova: any;

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOtpInputModule,
    CommonModule,
    HeaderWithBackComponent,
    SaveBtnComponent,
  ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent {
  otp: any;
  showOtpComponent = true;
  verifier: RecaptchaVerifier | undefined;
  resendOtpTime: number = 120;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  constructor(
    private router: Router,
    public dataProvider: DataProviderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.dataProvider.loginConfirmationResult) {
      this.router.navigate(['login']);
    } else {
      this.startResendTimer();
    }
    // this.startSmsRetriever()
  }
  // startSmsRetriever() {
  
  //   if (cordova.plugins.smsRetriever) {
  //     cordova.plugins.smsRetriever.startListening(
  //       (message:any) => {
  //         console.log('OTP Received: ', message);
  //         // Extract OTP from the message and auto-fill it in the input field
  //       },
  //       (error:any) => {
  //         console.error('Error retrieving SMS: ', error);
  //       }
  //     );
  //   } else {
  //     console.error('SMS Retriever plugin not available');
  //   }
  // }
  async sendOTP() {
    if (this.dataProvider.loginConfirmationResult) {
      
      this.authService
        .resendOtp(this.dataProvider.userMobile)
        .then((login) => {
          this.resendOtpTime = 120;
          this.startResendTimer();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log('finally');
        });
    }
  }
  async login() {
    // if (this.dataProvider.loginConfirmationResult) {
    //   this.dataProvider.loginConfirmationResult
    //     .confirm(this.otp)
    //     .then((result) => {
    //       this.authService.setUserData(result.user);
    //       this.router.navigate(['profile']);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       console.log('finally');
    //     });
    // }
    if (this.dataProvider.loginConfirmationResult) {
      await this.authService
        .verifyOTP(this.otp)
        .then((result) => {})
        .catch((error) => {
          console.log(error);
        });
    }
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputmode: 'tel',
    inputStyles: {
      width: '38px',
      height: '38px',
    },
  };
  onOtpChange(otp: any) {
    this.otp = otp;
  }
  setVal(val: number) {
    this.ngOtpInput.setValue(val);
  }
  toggleDisable() {
    if (this.ngOtpInput.otpForm) {
      if (this.ngOtpInput.otpForm.disabled) {
        this.ngOtpInput.otpForm.enable();
      } else {
        this.ngOtpInput.otpForm.disable();
      }
    }
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }

  startResendTimer() {
    setTimeout(() => {
      if (this.resendOtpTime > 0) {
        this.resendOtpTime--;
        this.startResendTimer();
      }
    }, 1000);
  }
}
