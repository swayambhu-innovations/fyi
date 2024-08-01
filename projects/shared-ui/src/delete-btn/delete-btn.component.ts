import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'lib-delete-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-btn.component.html',
  styleUrl: './delete-btn.component.css'
})
export class DeleteBtnComponent {
  @Input() btnName: string='';
  @Input() disabled: boolean=false;


}
