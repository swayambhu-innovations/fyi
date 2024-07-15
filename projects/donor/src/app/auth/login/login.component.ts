import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UnAuthCityComponent } from '../../sharedComponent/un-auth-city/un-auth-city.component';
import { GeolocationService } from '../../geolocation/geolocation.service';
import { SaveBtnComponent } from '../../../../../shared-ui/src/save-btn/save-btn.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SaveBtnComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private AuthService: AuthService,
    private _bottomSheet: MatBottomSheet,
    private geolocationService: GeolocationService
  ) {}

  skip() {
    this._bottomSheet.open(UnAuthCityComponent);
  }  

  state: string | null = null;
  error: string | null = null;


  ngOnInit(): void {
    this.geolocationService.getCurrentLocation()
      .then(coords => {
        return this.geolocationService.getStateFromCoordinates(coords.lat, coords.lng);
      })
      .then(state => {
        this.state = state;
      })
      .catch(err => {
        this.error = err.message;
      });
  }
}
