import { Routes } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { NavbarComponent } from './sharedComponent/navbar/navbar.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/feed.component';

export const routes: Routes = [
    {path:'',component: NavbarComponent},
    {path:'report',component: ReportsComponent},
    {path:'feed',component: FeedComponent},
    {path:'home',component: HomeComponent},
    {path:'users',component: UsersComponent},
    {path:'services',component: ServiceComponent},
    
];
