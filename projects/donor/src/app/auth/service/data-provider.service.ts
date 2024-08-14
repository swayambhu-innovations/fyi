import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ConfirmationResult, User } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  isFirstTime: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  
  mainCategoriesLoaded: boolean = false;
  loggedIn: boolean = false;
  selectedCatalog: string = '';
  userMobile: string = '';
  
  checkingAuth: boolean = true;
  loginConfirmationResult: ConfirmationResult | undefined;
  
  currentUser:
    | {
        
        userData: any;
      }
    | undefined;
  currentUser$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  isPageLoaded$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() {}
}
