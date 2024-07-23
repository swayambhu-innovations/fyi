import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { OtpComponent } from './auth/otp/otp.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { MemberDetailsComponent } from './member-details/member-details.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component : HomeComponent},
    {path: 'otp', component : OtpComponent},
    {path: 'profile', component : ProfileInfoComponent},
    {path: 'add-address', component : AddAddressComponent},
    {path:'member-detail',component:MemberDetailsComponent}
];
