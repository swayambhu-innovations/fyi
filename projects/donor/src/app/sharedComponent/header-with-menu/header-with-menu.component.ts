import { Component } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { DataProviderService } from '../../auth/service/data-provider.service';
@Component({
  selector: 'app-header-with-menu',
  standalone: true,
  imports: [],
  templateUrl: './header-with-menu.component.html',
  styleUrl: './header-with-menu.component.scss',
})
export class HeaderWithMenuComponent {
  constructor(
    private authService: AuthService,
    public DataProviderService: DataProviderService
  ) {}
  name: any;
  ngOnInit(): void {
    setTimeout(() => {
      this.name = this.DataProviderService.currentUser?.userData.name;
    }, 3000);
  }
}
