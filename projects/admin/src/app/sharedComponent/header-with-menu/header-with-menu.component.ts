import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-header-with-menu',
  standalone: true,
  imports: [],
  templateUrl: './header-with-menu.component.html',
  styleUrl: './header-with-menu.component.scss'
})
export class HeaderWithMenuComponent {
 
  constructor (private authService:AuthService ){}
 name:any
 
  ngOnInit():void{
    this.authService.user$.subscribe((userData: any | null) => {
      console.log(userData.displayName);
      if (userData) {
        this.name= userData.displayName;
      } 
    });  

  
  }
  
  

  
}
