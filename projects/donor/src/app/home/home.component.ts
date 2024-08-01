import { Component } from '@angular/core';
import { SurveyFormComponent } from "./survey-form/survey-form.component";
import { EventComponent } from "./event/event.component";
import { HeaderWithMenuComponent } from "../sharedComponent/header-with-menu/header-with-menu.component";
import { OtherServicesComponent } from "./other-services/other-services.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SurveyFormComponent, EventComponent, HeaderWithMenuComponent, OtherServicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
