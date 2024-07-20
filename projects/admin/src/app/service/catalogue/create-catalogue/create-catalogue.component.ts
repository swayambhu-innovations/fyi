import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderWithBackComponent } from '../../../sharedComponent/header-with-back/header-with-back.component';
import { FormsModule } from '@angular/forms';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
import { SaveBtnComponent } from '../../../../../../shared-ui/src/save-btn/save-btn.component';
@Component({
  selector: 'app-create-catalogue',
  standalone: true,
  imports: [HeaderWithBackComponent,FormsModule,CancelBtnComponent,SaveBtnComponent],
  templateUrl: './create-catalogue.component.html',
  styleUrl: './create-catalogue.component.scss',
})
export class CreateCatalogueComponent {
  id: string = '';
  catalogueName: string = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // if(this.route.snapshot.paramMap.has('id')) {
    //   this.id = this.route.snapshot.paramMap.get('id') || '';
    //   console.log(this.id)
    // }
  }
  addCatalogue() {
    console.log('add catalogue');
  }
  cancel(){
  console.log('cancel'); }
}
