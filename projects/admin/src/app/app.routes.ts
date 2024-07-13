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
export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path:'report',component: ReportsComponent},
    {path:'feed',component: FeedComponent},
    {path:'home',component: HomeComponent},
    {path:'users',component: UsersComponent},
    {path:'service',component: ServiceComponent},
    {path:'area',component: AreaComponent},
    {path:'catalogue',component: CatalogueComponent},
    {path:'donation',component: DonationComponent},
    {path:'tax',component: TaxComponent},
    {path:'event',component: EventComponent},
    
];
