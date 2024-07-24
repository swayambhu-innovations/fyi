import { Routes } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { NavbarComponent } from './sharedComponent/navbar/navbar.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './auth/login/login.component';
import { TaxComponent } from './service/tax/tax.component';
import { EventComponent } from './service/event/event.component';
import { AreaComponent } from './service/area/area.component';
import { CatalogueComponent } from './service/catalogue/catalogue.component';
import { DonationComponent } from './service/donation/donation.component';
import { SplashScreenComponent } from './auth/splash-screen/splash-screen.component';
import { AuthGuard } from './auth/auth.guard';
import { NotAdminComponent } from './auth/not-admin/not-admin.component';
import { LoggedInAuthGuard } from './auth/loggedin.guard';
import { UserAndPermissionComponent } from './user-and-permission/user-and-permission.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { CouponComponent } from './coupon/coupon.component';
import { CreateCatalogueComponent } from './service/catalogue/create-catalogue/create-catalogue.component';
import { AddeventComponent } from './service/event/addevent/addevent.component';

export const routes: Routes = [
    // {path : '', component:SplashScreenComponent},
    {path: "",redirectTo: "/login",pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: 'notAdmin', component:NotAdminComponent },
    {path:'report',component: ReportsComponent,canActivate: [AuthGuard]},
    {path:'feed',component: FeedComponent,canActivate: [AuthGuard]},
    {path:'home',component: HomeComponent , canActivate: [AuthGuard]},
    {path:'users',component: UsersComponent,canActivate: [AuthGuard]},
    {path:'service',component: ServiceComponent, canActivate: [AuthGuard]},
    {path:'area',component: AreaComponent,canActivate: [AuthGuard]},
    {path:'catalogue',component: CatalogueComponent,canActivate: [AuthGuard]},
    {path:'donation',component: DonationComponent,canActivate: [AuthGuard]},
    {path:'tax',component: TaxComponent ,canActivate: [AuthGuard]},
    {path:'event',component: EventComponent,canActivate: [AuthGuard]},
    {path:'user-Permission',component: UserAndPermissionComponent,canActivate: [AuthGuard]},
    {path:'surveyform',component: SurveyFormComponent,canActivate: [AuthGuard]},
    {path:'coupon',component: CouponComponent,canActivate: [AuthGuard]},
    {path:'create-catalogue',component: CreateCatalogueComponent,canActivate: [AuthGuard]},
    { path: 'create-catalogue/:id', component: CreateCatalogueComponent,canActivate:[AuthGuard] },
    {path:'addevent',component: AddeventComponent,canActivate: [AuthGuard]}
];
