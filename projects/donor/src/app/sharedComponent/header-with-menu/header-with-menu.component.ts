import { Component } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-header-with-menu',
  standalone: true,
  imports: [],
  templateUrl: './header-with-menu.component.html',
  styleUrl: './header-with-menu.component.scss'
})
export class HeaderWithMenuComponent {
  constructor(private authService:AuthService){}
  name:any
  ngOnInit():void{
    this.authService.user$.subscribe((userData: any | null) => {
      if (userData) {
        this.name= userData.displayName;
      } 
    });  
  }
}
