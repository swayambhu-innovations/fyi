import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderWithMenuComponent } from "../sharedComponent/header-with-menu/header-with-menu.component";
import { AddButtonComponent } from '../../../../shared-ui/src/lib/add-button/add-button.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UserPermissionService } from './service/user-permission.service';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
@Component({
  selector: 'app-user-and-permission',
  standalone: true,
  imports: [HeaderWithMenuComponent,AddButtonComponent],
  templateUrl: './user-and-permission.component.html',
  styleUrl: './user-and-permission.component.scss'
})
export class UserAndPermissionComponent {
  constructor(
    private UserPermissionService:UserPermissionService,
    private _bottomSheet: MatBottomSheet
  ) {}

    
  users: any[] = [];

  ngOnInit() {
    this.UserPermissionService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  saveUserDetail(): void {
    this._bottomSheet.open(AddUserComponent);
  }
  deleteUser(userDetail: any): void {
    this._bottomSheet.open(DeleteUserComponent, {
      data: userDetail,
    });
  }
  editUserDetail(userDetail: any) {
    this._bottomSheet.open(AddUserComponent, {
      data: userDetail,
    });
  }
  updatedStatus(userDetail: any) {
    userDetail.active = !userDetail.active;
    this.UserPermissionService.addUser(userDetail);
  }
}
