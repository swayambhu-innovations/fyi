import { NgIf,CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import { CancelBtnComponent } from "../../../../../../shared-ui/src/cancel-btn/cancel-btn.component";
import { SaveBtnComponent } from "../../../../../../shared-ui/src/save-btn/save-btn.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddvarientComponent } from '../addvarient/addvarient.component';
import { FormArray } from '@angular/forms';
import {  Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../service/event.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

interface Event {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  images1: string[];
  variants: { name: string; price: number; isActive: boolean }[];
}

@Component({
  selector: 'app-addevent',
  standalone: true,
  imports: [NgIf, CancelBtnComponent, SaveBtnComponent,CommonModule,NgFor,MatAccordion,MatNativeDateModule,MatFormFieldModule,
    MatInputModule, MatButtonModule,MatIconModule, MatDatepickerModule,MatNativeDateModule,MatExpansionPanel,MatExpansionPanelHeader,MatExpansionPanelTitle,MatSlideToggle,ReactiveFormsModule],
  templateUrl: './addevent.component.html',
  styleUrl: './addevent.component.scss',
  providers: [EventService]
})
export class AddeventComponent {
  selected="";
  pannel='details';
  getRepetitions(count: number): any[] {
    return new Array(count);
  }
 
  itineraryForm: FormGroup;
  constructor(private router: Router,private storage: Storage,private _bottomSheet: MatBottomSheet,private fb: FormBuilder,private eventservice:EventService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheetRef: MatBottomSheetRef<AddeventComponent>
  ) {
    this.itineraryForm = this.fb.group({
      activities: this.fb.array([])
    });
  }
  get activities(): FormArray {
    return this.itineraryForm.get('activities') as FormArray;
  }
  addActivity(): void {
    const activityGroup = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    this.activities.push(activityGroup);
  }
  deleteActivity(index: number): void {
    this.activities.removeAt(index);
  } 

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
    
 
    events:Event[] = [
      {
        name: 'Searic Kashi Summit 2024',
        description: '',
        startDate: '2024-07-13',
        endDate: '2024-07-15',
        images1: [],
        variants: [
          { name: 'Rotarian', price: 11201, isActive: true },
          { name: 'Couple', price: 21201, isActive: false }
        ]
      },
      {
        name: 'Another Event 2024',
        description: '',
        startDate: '2024-08-01',
        endDate: '2024-08-05',
        images1: [],
        variants: [
          { name: 'Single', price: 5000, isActive: true },
          { name: 'Group', price: 15000, isActive: false }
        ]
      }
    ];


  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  
  openBottomSheet(): void {
    this._bottomSheet.open(AddvarientComponent);
  }
  removeImageslab(eventIndex: number, imageIndex: number) {
    this.events[eventIndex].images1.splice(imageIndex, 1);
  }
  async addImageinslab(e: any,eventIndex: any) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(async file =>{
        const filePath = `event/${new Date().getTime()}`;
        console.log(filePath)
        await uploadBytesResumable(ref(this.storage, filePath), file);
        const fileUrl = await getDownloadURL(ref(this.storage, filePath));
        this.events[eventIndex].images1.push(fileUrl);
      });
    }
    }
    nextpannel(view:string){
      if (this.eventForm.valid) {
        this.eventservice.addEvent(this.eventForm.value).then(() => {
          this.pannel=view;

        });
      }

      // if (this.itineraryForm.valid) {
      //   console.log(this.itineraryForm.value); 
        
      // }
      
      

    }
  
}
//this endpoint


