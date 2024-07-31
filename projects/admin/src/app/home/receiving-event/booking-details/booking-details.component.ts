import { Component, inject, input, Input } from '@angular/core';
import { HeaderWithBackComponent } from "../../../sharedComponent/header-with-back/header-with-back.component";
import { CommonModule } from '@angular/common';
import { EditMemberDetailComponent } from '../edit-member-detail/edit-member-detail.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeleteBtnComponent } from "../../../../../../shared-ui/src/delete-btn/delete-btn.component";
import { collection, deleteDoc, doc, Firestore, getDocs } from '@angular/fire/firestore';
import { booking } from '../booking.structure';
import { ReceivingEventComponent } from '../receiving-event.component';
import { ReceivingEventService } from '../../services/receiving-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { group } from '@angular/animations';
import { DeleteBookingComponent } from '../delete-booking/delete-booking.component';
interface Member {
  name: string;
  Aadhar: string;
  Gender: string;
  Contact:string;
}
@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [HeaderWithBackComponent, CommonModule, DeleteBtnComponent,ReceivingEventComponent],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss'
})
export class BookingDetailsComponent{
userId:any;


  ngOnInit(){
  const BookingId = this.route.snapshot.paramMap.get('BookingId');
  if (BookingId) {
    this.getBookingDetails(BookingId);
  }
}
 
  @Input() bookingdata: booking | null = null;

  constructor(private route: ActivatedRoute,private bottomSheet: MatBottomSheet, private firestore:Firestore, private receivingEventService : ReceivingEventService , private router:Router ) {}
  bookings: string[] |any;
 
  async getBookingDetails(BookingId: string): Promise<void> {
    const usersSnapshot = await this.receivingEventService.getAllUsers();
    for (const user of usersSnapshot.docs) {
      const userId = user.id;
      const bookingsSnapshot = await this.receivingEventService.getUserBookings(userId);
      for (const booking of bookingsSnapshot.docs) {
        const bookingData = booking.data();
        const membersdet=this.members.find(group=>group.name===bookingData['memberDetail'])
        console.log(membersdet)
        if (bookingData['id'] === BookingId) {
          this.bookingdata = {
            "BookingId": bookingData["id"],
            "name": bookingData["customer"].name,
            "contact": bookingData["customer"].phoneNumber,
            "eventname": bookingData["event"].eventName,
            "slabname": bookingData["slab"].name,
            "varientname": bookingData["variant"].name,
            "price": bookingData["variant"].totalTicket,
            "tickets": bookingData["totalMember"],
            "status":bookingData["paymentDetail"].payment,
            "member":bookingData["memberDetail"]
          };
          this.members=bookingData["memberDetail"],
          this.userId = userId;
          break;
        
        }
      }
    }
    console.log(this.bookingdata);
  }

 
  selectedTab: number = 0;
  members: any[] = [];

  selectTab(index: number) {
    this.selectedTab = index
  }

 
  
  openDeleteBottomSheet() {
    const ref = this.bottomSheet.open(DeleteBookingComponent, {
      data: {
        userId: this.userId,
        bookingId: this.bookingdata?.BookingId
      }
    });
  }
  editMember() {
    if (this.selectedTab !== null) {
      const memberToEdit = { ...this.members[this.selectedTab] };
      const ref = this.bottomSheet.open(EditMemberDetailComponent, {
        data: memberToEdit
      });

      ref.afterDismissed().subscribe(updatedMember => {
        if (updatedMember) {
          this.members[this.selectedTab] = updatedMember;
        }
      });
    }
  }




  
}
