import { Component } from '@angular/core';
import { HeaderWithMenuComponent } from '../sharedComponent/header-with-menu/header-with-menu.component';
import { GlobalServiceService } from '../globalService/global-service.service';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../../shared-ui/src/lib/spinner/loading.service';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderWithMenuComponent,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  constructor(private GlobalServiceService: GlobalServiceService,private LoadingService:LoadingService) {}
  userList: any[] = [];
  dummy='assets/donor/images.jfif'
  ngOnInit() {
    this.userList=this.GlobalServiceService.userList()
    if (!this.GlobalServiceService.getUsersFetched()) {
      this.LoadingService.show()
      this.getUsers()
      this.GlobalServiceService.setUsersFetched(true);
    }  }
    getUsers(): void {
      this.GlobalServiceService.fetchDocs('users').subscribe({
        next: (users) => {
          console.log('users', users);
          users.forEach((user: any) => {
            if ('active' in user) {
              this.userList.push(user);
            }
          });
          console.log(this.userList);
          this.LoadingService.hide();
          this.GlobalServiceService.userList.set(this.userList)

        },
        error: (err) => {
          console.error('Error fetching users', err);
          this.LoadingService.hide();
        }

      });
    }

  setDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = this.dummy;
  }
}
