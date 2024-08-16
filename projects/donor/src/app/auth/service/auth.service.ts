import { inject, Injectable } from '@angular/core';
import {
  ApplicationVerifier,
  Auth,
  signInWithPhoneNumber,
  user,
  User,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { DataProviderService } from './data-provider.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from '../../home/event/event.service';
import { ToastService } from '../../../../../shared-ui/src/lib/toast/service/toast.service';
import { confirmSignIn, confirmSignUp, getCurrentUser, signIn } from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  isProfileUpdated: boolean = false;
  user$: Observable<User | null> = user(this._auth);

  constructor(
    public auth: Auth,
    private Firestore: Firestore,
    private dataProvider: DataProviderService,
    private router: Router,
    private eventService: EventService,
    private ToastService:ToastService
  ) {
    this.dataProvider.checkingAuth = true;
    this.initializeUser();    
  }

  async initializeUser() {
    try {

      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(username, userId, signInDetails);
        if (userId) {
          this.ToastService.showSuccess('Login')
          
          this.dataProvider.loggedIn = true;
          this.getUserData(userId).subscribe(async (userData: any) => {
            this.dataProvider.currentUser = {
              
              userData: userData,
            };
            console.log(userData)
            if (!userData || !userData.name) {
              this.router.navigate(['profile']);
            } else {
              this.getAddresses(this.dataProvider.currentUser!.userData.uid).then(
                (result) => {
                  // const addresses = result.docs.map((address: any) => {
                  //   return { ...address.data(), id: address.id };
                  // });
                    this.router.navigate(['home']);
                  
                }
              );
            }
            this.dataProvider.checkingAuth = false;
          });
        } else {
          this.dataProvider.loggedIn = false;
          this.dataProvider.checkingAuth = false;
          this.dataProvider.currentUser = undefined;
        }
      
      console.log(username, userId, signInDetails);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }
  
  async loginWithPhoneNumber(phone: string, appVerifier: ApplicationVerifier) {
    console.log(phone,appVerifier)
    if (phone.length != 10) {
      return Promise.reject(new Error('Invalid Phone Number'));
    }
    console.log(this.auth,phone,appVerifier)
    return signInWithPhoneNumber(this.auth, '+91' + phone, appVerifier);
  }

  async setUserData(uid: any,phone:any) {
    let userDoc = await getDoc(doc(this.Firestore, 'users', uid));
    console.log(userDoc)
    if (userDoc.exists()) {
      this.dataProvider.currentUser = {
        userData: userDoc.data(),
      };

      return;
    }
    let newUserData = {
      name: user.name || '',
      phoneNumber: `+91${phone}` || '',
      photoURL: user.photoURL || '',
      uid: uid || '',
      dob: user.dob || '',
      gender: user.gender || '',
      age: user.age || '',
    };
    console.log(newUserData)

    await setDoc(doc(this.Firestore, 'users', uid), newUserData);
    this.dataProvider.currentUser = {
     
      userData: newUserData,
    };
    this.router.navigate(['profile']);
    return;
  }

  getUserData(uid: string) {
    return docData(doc(this.Firestore, 'users', uid));
  }

  async getAddresses(userId: string) {
    return await getDocs(
      collection(this.Firestore, 'users', userId, 'addresses')
    );
  }

  isUserExist:any=false;
  phone:any;
  uid:any=''
  async verifyOTP(otp: string) {
    if (this.isUserExist) {
      console.log('handleSignInConfirmation')
      return await this.handleSignInConfirmation(otp);
    }
    else{
    console.log('confirmSignUp')
      return await this.confirmSignUp(otp);
    }
  }

  async confirmSignUp(otp:any) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: `+91${this.phone}`,
        confirmationCode: otp,
      });
      console.log(isSignUpComplete, nextStep);
      console.log('Sign up confirmed');
      console.log(this.uid)
    
      await this.setUserData(this.uid,this.phone);
      this.initializeUser()


    } catch (error:any) {
      
      this.ToastService.showError('Invalid OTP')

    }
  }
  
  async handleSignInConfirmation(otp:any) {
    try {
      await confirmSignIn({ challengeResponse: otp }).then((res) => {

        console.log(res);
        this.router.navigate(['profile']);
        this.initializeUser()


      });
    } catch (error:any) {

      this.ToastService.showError('Invalid OTP')
    }
  }

 async resendOtp(phone: string) {
    const output = await signIn({
        password: 'TempPassword123!',
        username: `+91${this.phone}`,
        options: {
          userAttributes: {
            email: 'hello@mycompany.com',
            phone_number: `+91${this.phone}`,
          },
        },
      })
  }
}
