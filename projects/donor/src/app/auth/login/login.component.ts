import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UnAuthCityComponent } from '../../sharedComponent/un-auth-city/un-auth-city.component';
import { GeolocationService } from '../../geolocation/geolocation.service';
import { SaveBtnComponent } from '../../../../../shared-ui/src/save-btn/save-btn.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecaptchaVerifier } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { DataProviderService } from '../service/data-provider.service';
import { ToastService } from '../../../../../shared-ui/src/lib/toast/service/toast.service';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { signUp } from 'aws-amplify/auth';
import { confirmSignUp } from 'aws-amplify/auth';
import { signIn, signOut } from 'aws-amplify/auth';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-login',
  standalone: true,
  imports: [SaveBtnComponent, FormsModule, AmplifyAuthenticatorModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private AuthService: AuthService,
    private _bottomSheet: MatBottomSheet,
    private geolocationService: GeolocationService,
    private Router: Router,
    private DataProviderService: DataProviderService,
    private ToastService: ToastService
  ) {}

  state: string | null = null;
  error: string | null = null;

  phoneNumber: string = '';
  terms: boolean = false;
  verifier: RecaptchaVerifier | undefined;

  ngOnInit(): void {
    this.geolocationService
      .getCurrentLocation()
      .then((coords) => {
        return this.geolocationService.getStateFromCoordinates(
          coords.lat,
          coords.lng
        );
      })
      .then((state) => {
        this.state = state;
      })
      .catch((err) => {
        this.error = err.message;
      });
  }

  skip() {
    // this._bottomSheet.open(UnAuthCityComponent);
    this.ToastService.showSuccess('Login Skipped');
    this.Router.navigate(['/home']);
  }

  async login() {
    if (this.phoneNumber.length == 10) {
      if (!this.verifier)
        this.verifier = new RecaptchaVerifier(
          this.AuthService.auth,
          'recaptcha-container',
          {
            size: 'invisible',
          }
        );
      this.AuthService.loginWithPhoneNumber(this.phoneNumber, this.verifier)
        .then((login) => {
          this.DataProviderService.loginConfirmationResult = login;
          this.DataProviderService.userMobile = this.phoneNumber;
          this.phoneNumber = '';
          this.terms = false;
          this.Router.navigate(['otp']);
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => {
          console.log('finally');
        });
    }
  }

  code: any;
  phone: any = '';
  async signUp() {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: `+91${this.phone}`,
        password: 'TempPassword123!',
        options: {
          userAttributes: {
            email: 'hello@mycompany.com',
            phone_number: `+91${this.phone}`,
          },
        },
      });
      console.log(isSignUpComplete, userId, nextStep);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }
  async confirmSignUp() {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: `+91${this.phone}`,
        confirmationCode: this.code,
      });
      console.log(isSignUpComplete, nextStep);
      console.log('Sign up confirmed');
    } catch (error) {
      console.error('Error confirming sign up:', error);
    }
  }

  async signIn() {
    await signIn({
      password: 'TempPassword123!',
      username: `+91${this.phone}`,
      options: {
        userAttributes: {
          email: 'hello@mycompany.com',
          phone_number: '+917068396232',
        },
      },
    });
  }
  
  async signout() {
    await signOut();
  }
}
