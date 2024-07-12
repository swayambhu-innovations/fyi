import { Routes } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'service', component: ServiceComponent}
];
