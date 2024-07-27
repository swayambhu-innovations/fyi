import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LogoutModelComponent } from '../logout-model/logout-model.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-header-with-menu',
  standalone: true,
  imports: [MatBottomSheetModule,MatButtonModule,MatIconModule],
  templateUrl: './header-with-menu.component.html',
  styleUrl: './header-with-menu.component.scss'
})
export class HeaderWithMenuComponent {
 
  constructor (private authService:AuthService ,private router:Router, private _bottomSheet: MatBottomSheet){}
  name:any
  ngOnInit():void{
    this.authService.user$.subscribe((userData: any | null) => {
      console.log(userData.displayName);
      if (userData) {
        this.name= userData.displayName;
      } 
    });  
  }
  navigationUandP(){
    this.router.navigate(['/','user-Permission']);
  }
  navigation_Survey(){
    this.router.navigate(['/','surveyform'])
  }
  navigation_Coupon(){
    this.router.navigate(['/','coupon'])
  }
  openLogout(): void {
    this._bottomSheet.open(LogoutModelComponent, {
    
    });
  }
}
