import { Component } from '@angular/core';
import { HeaderWithBackComponent } from '../sharedComponent/header-with-back/header-with-back.component';
import { AddButtonComponent } from '../../../../shared-ui/src/lib/add-button/add-button.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { LoadingService } from '../../../../shared-ui/src/lib/spinner/loading.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GlobalServiceService } from '../globalService/global-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [HeaderWithBackComponent, AddButtonComponent, CommonModule],
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.scss',
})
export class SurveyFormComponent {
  constructor(
    private _bottomSheet: MatBottomSheet,
    private loadingService: LoadingService,
    private GlobalService: GlobalServiceService,
  ) {}

  surveyList: any = [];

  ngOnInit() {
    try {
      this.GlobalService.fetchDocs('surveys').subscribe((surveys) => {
        this.surveyList = surveys;
        console.log(this.surveyList);
      });
    } catch (e) {
      console.error(e);
    }
  }
  addSurvey(): void {
    this._bottomSheet.open(AddSurveyComponent);
  }
  edit(survey:any) {
    console.log(survey)
    // this._bottomSheet.open(AddSurveyComponent, {
    //   data: survey,
    // });
  }
  delete(survey:any) {
    console.log(survey)
    //this.GlobalService.deleteDoc('surveys', survey.id);
  }
  updatedStatus(survey:any){
    console.log(survey)
  }
}
