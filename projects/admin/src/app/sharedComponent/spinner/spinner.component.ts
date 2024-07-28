import { Component } from '@angular/core';
import { LoadingService } from './loading.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule,CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  isLoading = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) {}
}
