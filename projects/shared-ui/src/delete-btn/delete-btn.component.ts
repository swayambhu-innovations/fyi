import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-delete-btn',
  standalone: true,
  imports: [],
  templateUrl: './delete-btn.component.html',
  styleUrl: './delete-btn.component.css'
})
export class DeleteBtnComponent {
  @Input() btnName: string='';

}
