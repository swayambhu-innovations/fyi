import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-not-admin',
  standalone: true,
  imports: [],
  templateUrl: './not-admin.component.html',
  styleUrl: './not-admin.component.scss'
})
export class NotAdminComponent {
  
  authService = inject(AuthService);
}
