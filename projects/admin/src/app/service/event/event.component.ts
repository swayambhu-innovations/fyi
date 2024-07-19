import { Component, ElementRef, Input, Renderer2, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgFor } from '@angular/common';
import { AddButtonComponent } from '../../../../../shared-ui/src/lib/add-button/add-button.component';
import {MatBottomSheet,MatBottomSheetModule,} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import { AddeventComponent } from "./addevent/addevent.component";
import { EventService } from './service/event.service';
import { DeleteEventComponent } from './delete-event/delete-event.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Firestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [MatExpansionModule,NgFor,AddButtonComponent,MatButtonModule,
    MatBottomSheetModule,NgFor,MatSlideToggleModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  providers: [EventService]
})
export class EventComponent {


  constructor(private eventService: EventService,private _bottomSheet: MatBottomSheet) { }
  imageUrl: string | undefined
  events: any[] = [];
  ngOnInit() {
    this.eventService.getEvents().subscribe((data:any)=>{                   //read detail
      this.events=data;
      console.log(data)
    })
  }
  viewEvent(event: Event): void {
    console.log('Viewing event', event);
  }
  openBottomSheet(): void {
    this._bottomSheet.open(AddeventComponent);                       //save detail
  }
  editEvent(eventDetail:any) {
    this._bottomSheet.open(AddeventComponent, {                       //editdetail
      data: eventDetail,
    });
  } 
  deleteEvent(eventDetail: any): void {
    this._bottomSheet.open(DeleteEventComponent, {                   //delete
      data: eventDetail,
    });
  }

  updatedStatus(eventDetail:any){
    eventDetail.active=!eventDetail.active                 //updatestatus
    this.eventService.addEvent(eventDetail)
  }
 
}
