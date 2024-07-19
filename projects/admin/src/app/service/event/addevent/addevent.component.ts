import { NgFor } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../service/event.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { SaveBtnComponent } from '../../../../../../shared-ui/src/save-btn/save-btn.component';
import { CancelBtnComponent } from '../../../../../../shared-ui/src/cancel-btn/cancel-btn.component';
@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [NgFor,CancelBtnComponent, SaveBtnComponent, ReactiveFormsModule],
  templateUrl: './addevent.component.html',
  styleUrl: './addevent.component.scss',
  providers: [EventService]
})
export class AddeventComponent {
  constructor(private router: Router,private storage: Storage,private fb: FormBuilder,private eventservice:EventService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<AddeventComponent>
  ) {}
  selected="";
  
 
  eventForm : FormGroup = new FormGroup({
    eventName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    eventId: new FormControl(''),
    cityLinked: new FormControl (0), 
    active: new FormControl(true),
    
  });
  ngOnInit() {
    console.log('add event type component');
    if (this.data && this.data.eventId) {
      console.log(this.data);
      this.eventForm.setValue(this.data);
    }
  }
  submit(select:string){
    this.selected=select;
  }

  images: string[] = [];
  uploadPercent: number = 0;

  removeImage(index: number): void {
    this.images.splice(index, 1);
    this.eventForm.get('images')?.setValue(this.images);// Update images field
  }

  async addImage(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(async file =>{
        const filePath = `event/${new Date().getTime()}`;
        console.log(filePath)
        await uploadBytesResumable(ref(this.storage, filePath), file);
        const fileUrl = await getDownloadURL(ref(this.storage, filePath));
        this.images.push(fileUrl);
        this.eventForm.get('images')?.setValue(this.images); // Update images field
      });
    }
    }
 
  


  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  saveEvent() {
    if (this.eventForm.valid) {
      this.eventservice.addEvent(this.eventForm.value).then(() => {
        this._bottomSheetRef.dismiss();
      });
    }
  }
 
  cancel() {
    this._bottomSheetRef.dismiss();
  }
}

