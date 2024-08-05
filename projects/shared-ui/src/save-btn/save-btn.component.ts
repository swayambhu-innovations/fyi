import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'lib-save-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-btn.component.html',
  styleUrl: './save-btn.component.css'
})
export class SaveBtnComponent {
  @Input() btnName: string='';
  @Input() disabled: boolean=false;


}
