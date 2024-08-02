import { Component } from '@angular/core';
import { HeaderWithBackComponent } from '../sharedComponent/header-with-back/header-with-back.component';

import { AuthService } from '../auth/service/auth.service';

import { CancelBtnComponent } from '../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { SaveBtnComponent } from '../../../../shared-ui/src/save-btn/save-btn.component';

import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from './service/address.service';
import { DataProviderService } from '../auth/service/data-provider.service';
import { ReactiveFormsModule } from '@angular/forms';
import { updatePhoneNumber } from '@angular/fire/auth';
@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [
    HeaderWithBackComponent,
    CancelBtnComponent,
    CommonModule,
    FormsModule,
    SaveBtnComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.scss',
})
export class AddAddressComponent {
  constructor(
    private Router: Router,
    private AuthService: AuthService,
    private AddressService: AddressService,
    private dataProvider: DataProviderService
  ) {}
  stateList: any[] = [];
  cityList: any[] = [];
  selectedCityId: string = '';
  selectedStateId: string = '';

  addressForm: FormGroup = new FormGroup({
    selectedStateId: new FormControl(this.selectedStateId, Validators.required),
    selectedCityId: new FormControl(this.selectedCityId, Validators.required),
    pincode: new FormControl('', Validators.required),
    landmark: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    active: new FormControl(true),
    addressId: new FormControl(''),
  });

  async ngOnInit() {
    await this.AddressService.getStateList().then((stateList) => {
      stateList?.docs.map((state: any) => {
        if (state.data()['active']) {
          this.stateList.push(state.data());
        }
      });
      this.selectedStateId = this.stateList[0].stateId;
      this.getCities();
    });
    if (this.dataProvider.currentUser?.userData?.phoneNumber) {
      const modifiedPhoneNumber =
        this.dataProvider.currentUser.userData.phoneNumber.slice(3);

      this.addressForm.patchValue({
        phoneNumber: modifiedPhoneNumber,
      });
    } else {
      console.log('Phone number is not defined');
    }
  }
  async getCities() {
    await this.AddressService.getCityList(this.selectedStateId).then(
      (cityList) => {
        cityList.docs.map((city: any) => {
          if (city.data()['active']) {
            this.cityList.push(city.data());
          }
        });
        this.selectedCityId = this.cityList[0].cityId;
      }
    );
  }
  submitAddress() {

    // this.AddressService.addAddress(
    //   this.addressForm.value,
    //   this.dataProvider.currentUser?.userData.uid
    // );
  }
}
