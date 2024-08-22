import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CancelBtnComponent } from "../../../../../shared-ui/src/cancel-btn/cancel-btn.component";
import { DeleteBtnComponent } from "../../../../../shared-ui/src/delete-btn/delete-btn.component";
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataProviderService } from '../../auth/service/data-provider.service';
import { signOut } from '@aws-amplify/auth';

@Component({
  selector: 'app-logout-model',
  standalone: true,
  imports: [CancelBtnComponent, DeleteBtnComponent],
  templateUrl: './logout-model.component.html',
  styleUrl: './logout-model.component.scss'
})
export class LogoutModelComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  private _bottomSheetRef: MatBottomSheetRef<LogoutModelComponent>,
  private router:Router,
  private DataProviderService:DataProviderService

){}
  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }
  async Logout(){
    try {
      this.DataProviderService.loggedIn=false;
      await signOut();
      setTimeout(() => {
        this.DataProviderService.currentUser=undefined
        this.router.navigate(['login']);
      }, 3000);
      this._bottomSheetRef.dismiss(); 
    } catch (error) {
      console.log('error signing out: ', error);
      this._bottomSheetRef.dismiss(); 

    }
  }
}
