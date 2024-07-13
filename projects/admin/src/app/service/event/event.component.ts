import { Component } from '@angular/core';
import { AddeventComponent } from "./addevent/addevent.component";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [AddeventComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

}
