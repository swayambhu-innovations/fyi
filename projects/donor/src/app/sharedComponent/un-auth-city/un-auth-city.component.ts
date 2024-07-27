import { Component, Inject } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { CancelBtnComponent } from '../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { SaveBtnComponent } from '../../../../../shared-ui/src/save-btn/save-btn.component';
import { GeolocationService } from '../../geolocation/geolocation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-un-auth-city',
  standalone: true,
  imports: [SaveBtnComponent, CancelBtnComponent,CommonModule,FormsModule],
  templateUrl: './un-auth-city.component.html',
  styleUrl: './un-auth-city.component.scss',
})
export class UnAuthCityComponent {
  constructor(
    private AuthService: AuthService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<UnAuthCityComponent>,
    private geolocationService: GeolocationService,
    private router:Router
  ) {}

  state: string | null = null;
  cities:any[]=[]
  selectedCityId: string = '';

  async ngOnInit() {
    try {
      const coords = await this.geolocationService.getCurrentLocation();
      this.state = await this.geolocationService.getStateFromCoordinates(
        coords.lat,
        coords.lng
      );
    } catch (err) {
      console.log(err)
    }

    this.geolocationService.getCity(this.state).then((cities) => {
      cities?.docs.map((city) => {
        if(city.data()['active']){
        this.cities.push(city.data());
        }
      });
      this.selectedCityId = this.cities[0].cityId;
    });

  }

  cancel() {
    this._bottomSheetRef.dismiss();
  }

  saveCity() {
    localStorage.setItem('cityDocId', this.selectedCityId);
    this.router.navigate(['/home'])
    this._bottomSheetRef.dismiss();


  }
}
