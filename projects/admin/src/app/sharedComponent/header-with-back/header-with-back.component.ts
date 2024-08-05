import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LogoutModelComponent } from '../logout-model/logout-model.component';

@Component({
  selector: 'app-header-with-back',
  standalone: true,
  imports: [],
  templateUrl: './header-with-back.component.html',
  styleUrl: './header-with-back.component.scss'
})
export class HeaderWithBackComponent {
  
  constructor (private location: Location,private authService:AuthService ,private router:Router, private _bottomSheet: MatBottomSheet){}
  
  @Input() pageTitle: string='';

  back(): void {
    this.location.back();
  }
  openLogout(): void {
    this._bottomSheet.open(LogoutModelComponent, {
    
    });
  }
}
