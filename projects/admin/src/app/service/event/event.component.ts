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
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import { LoadingService } from '../../../../../shared-ui/src/lib/spinner/loading.service';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [MatExpansionModule,NgFor,AddButtonComponent,MatButtonModule,
    MatBottomSheetModule,NgFor,MatSlideToggleModule,CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  providers: [EventService]
})
export class EventComponent {


  constructor(private eventService: EventService,private Router:Router,private _bottomSheet:MatBottomSheet,private LoadingService:LoadingService) { }
  imageUrl: string | undefined
  events: any[] = [];
  ngOnInit() {
    this.LoadingService.show();
    this.eventService.getEvents().subscribe((data:any)=>{                  
      this.events=data;
      console.log(data)
      this.LoadingService.hide();
    })
  }
  viewEvent(event: Event): void {
    console.log('Viewing event', event);
  }
  openBottomSheet(): void {
    this.Router.navigate(['/addevent']);
  }
  editEvent(eventDetail:any) {
    this.Router.navigate(['/editevent',eventDetail.eventId]);
  } 
  deleteEvent(eventDetail: any): void {
    this._bottomSheet.open(DeleteEventComponent, {                  
      data: eventDetail,
    });
  }

  updatedStatus(eventDetail:any){
    eventDetail.active=!eventDetail.active                 
    this.eventService.addEvent(eventDetail)
  }
 
}
