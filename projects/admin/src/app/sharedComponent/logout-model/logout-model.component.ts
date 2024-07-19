import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CancelBtnComponent } from "../../../../../shared-ui/src/cancel-btn/cancel-btn.component";
import { DeleteBtnComponent } from "../../../../../shared-ui/src/delete-btn/delete-btn.component";
import { AuthService } from '../../auth/auth.service';

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
  private authService:AuthService
){}
  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }
  Logout(): void {
    this._bottomSheetRef.dismiss();
    this.authService.signout()
    }
  

}
