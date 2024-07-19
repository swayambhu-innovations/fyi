import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-cancel-btn',
  standalone: true,
  imports: [],
  templateUrl: './cancel-btn.component.html',
  styleUrl: './cancel-btn.component.css'
})
export class CancelBtnComponent {
  @Input() btnName: string='';

}
