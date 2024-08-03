import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { OtpComponent } from './auth/otp/otp.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { EventPaymentComponent } from './event-payment/event-payment.component';
import { PaymentSuccessfulComponent } from './event-payment/payment-successful/payment-successful.component';
import { ListOfSurveyComponent } from './home/survey-form/list-of-survey/list-of-survey.component';
import { EventListComponent } from './home/event/event-list/event-list.component';
import { SlabListComponent } from './home/event/slab-list/slab-list.component';
import { Component } from '@angular/core';
import { VarientSelectionComponent } from './home/event/varient-selection/varient-selection.component';
import { DonationComponent } from './donation/donation.component';
import { CouponComponent } from './coupon/coupon.component';
import { FeedComponent } from './feed/feed.component';
import { AccountComponent } from './account/account.component';
import { PaymentFailedComponent } from './event-payment/payment-failed/payment-failed.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { PaymentDetailsComponent } from './booking-history/payment-details/payment-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component : HomeComponent},
    {path: 'otp', component : OtpComponent},
    {path: 'profile', component : ProfileInfoComponent},
    {path: 'add-address', component : AddAddressComponent},
    {path:'member-detail',component:MemberDetailsComponent},
    {path:'payment/:id' , component:EventPaymentComponent},
    {path:'payment-successful',component:PaymentSuccessfulComponent},
    {path:'patmentfailed',component:PaymentFailedComponent},
    {path:'survey-list' , component:ListOfSurveyComponent},
    {path:'event-list' , component:EventListComponent},
    {path:'slab/:id',component: SlabListComponent},
    {path : 'varient/:id',component:VarientSelectionComponent},
    {path : 'donation',component:DonationComponent},
    {path : 'feed',component:FeedComponent},
    {path : 'coupon',component:CouponComponent},
    {path : 'account',component:AccountComponent},
    {path : 'history',component:BookingHistoryComponent},
    {path : 'PaymentDetail/:BookingId' ,component:PaymentDetailsComponent},
    {path:'ContactUs',component:ContactUsComponent}
   
   
];
