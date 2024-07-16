import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataProviderService } from '../service/data-provider.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { RecaptchaVerifier } from '@angular/fire/auth';
import {NgOtpInputModule} from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import { HeaderWithBackComponent } from '../../sharedComponent/header-with-back/header-with-back.component';
import { SaveBtnComponent } from '../../../../../shared-ui/src/save-btn/save-btn.component';
@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule,NgOtpInputModule,CommonModule,HeaderWithBackComponent,SaveBtnComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent {
  otp: any;
  showOtpComponent = true;
  verifier: RecaptchaVerifier | undefined;
  resendOtpTime: number = 60;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  constructor(
    private router: Router,
    public dataProvider: DataProviderService,
    private authService: AuthService,
  ) {
    
  }

  ngOnInit() {
    if (!this.dataProvider.loginConfirmationResult) {
      console.log('No Confirmation Result');
      this.router.navigate(['login']);
    } else {
      this.startResendTimer();
    }
  }
  async sendOTP() {
    
    if (this.dataProvider.loginConfirmationResult) {
     
      if (!this.verifier)
        this.verifier = new RecaptchaVerifier(
        this.authService.auth,
        'recaptcha-container2',
        {
          size: 'invisible',
        }
      );
      this.authService
        .loginWithPhoneNumber(this.dataProvider.userMobile, this.verifier)
        .then((login) => {
          this.resendOtpTime = 60;
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
    if (this.dataProvider.loginConfirmationResult) {
      this.dataProvider.loginConfirmationResult
        .confirm(this.otp)
        .then((result) => {
          this.authService.setUserData(result.user);
          this.router.navigate(['home']);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log('finally');
        });
    }
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputmode: "tel",
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
