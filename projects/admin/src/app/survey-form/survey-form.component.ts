import { Component } from '@angular/core';
import { HeaderWithMenuComponent } from "../sharedComponent/header-with-menu/header-with-menu.component";

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [HeaderWithMenuComponent],
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.scss'
})
export class SurveyFormComponent {

}
