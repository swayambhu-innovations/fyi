import { Component } from '@angular/core';
import { HeaderWithBackComponent } from '../sharedComponent/header-with-back/header-with-back.component';
import { HeaderWithMenuComponent } from '../sharedComponent/header-with-menu/header-with-menu.component';
import { Router } from '@angular/router';
import { getAuth, deleteUser, Auth } from '@angular/fire/auth';
import { DataProviderService } from '../auth/service/data-provider.service';
import { NotLoginpageComponent } from '../not-loginpage/not-loginpage.component';
import { CommonModule } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LogoutModelComponent } from './logout-model/logout-model.component';
import { signOut } from '@aws-amplify/auth';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../home/event/event.service';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    HeaderWithBackComponent,
    HeaderWithMenuComponent,
    NotLoginpageComponent,
    CommonModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private EventService: EventService,
    private DataProviderService: DataProviderService,
    private _bottomSheet: MatBottomSheet
  ) {}
  movetoContactUs() {
    this.router.navigate(['ContactUs']);
  }

  async logout() {
    this._bottomSheet.open(LogoutModelComponent, {});
  }
  name: any;
  isLogin: any;
  ngOnInit(): void {
    this.isLogin = this.DataProviderService.loggedIn;
    setTimeout(() => {
      this.name = this.DataProviderService.currentUser?.userData.name;
    }, 3000);
    this.getFullRoute();
  }

  getFullRoute() {
    if (!this.DataProviderService.loggedIn) {
      // const fullUrl = this.router.url;
      const currentPath = this.ActivatedRoute.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      // const queryParams = this.ActivateRouted.snapshot.queryParams;
      this.EventService.skipedPage.set(currentPath);
      console.log(this.EventService.skipedPage());
    } else {
      this.EventService.skipedPage.set('');
      console.log('');
    }
  }

  navigate(address: string) {
    this.router.navigate(['profile']);
  }
  openInNewTab(url: string): void {
    window.open(url, '_blank');
  }
}
