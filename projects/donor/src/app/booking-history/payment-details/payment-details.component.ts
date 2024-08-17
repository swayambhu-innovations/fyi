import { Component, Input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { booking } from '../../../../../admin/src/app/home/receiving-event/booking.structure';
import { ReceivingEventService } from '../../../../../admin/src/app/home/services/receiving-event.service';
import { CommonModule } from '@angular/common';
import { HeaderWithBackComponent } from "../../sharedComponent/header-with-back/header-with-back.component";
import { LoadingService } from '../../../../../shared-ui/src/lib/spinner/loading.service';
import { DataProviderService } from '../../auth/service/data-provider.service';
interface Member {
  name: string;
  Aadhar: string;
  Gender: string;
  Contact:string;
}
@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule, HeaderWithBackComponent],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss'
})
export class PaymentDetailsComponent {
  userId:any;
  @Input() bookingdata: booking | null = null;
  selectedTab: number = 0;
  members: any[] = [];
  bookings: string[] |any;
  constructor(private LoadingService:LoadingService,private route: ActivatedRoute,private bottomSheet: MatBottomSheet, private firestore:Firestore, private receivingEventService : ReceivingEventService , private router:Router , private DataProviderService:DataProviderService) {}
  
  ngOnInit(){
    this.LoadingService.show();
    const BookingId = this.route.snapshot.paramMap.get('BookingId');
    if (BookingId) {
      this.getBookingDetails(BookingId).then(() => this.LoadingService.hide());;
    }
  }
   
  async getBookingDetails(BookingId: string): Promise<void> {
   
      const userId = this.DataProviderService.currentUser?.userData?.uid;
      const bookingsSnapshot = await this.receivingEventService.getUserBookings(userId);
      for (const booking of bookingsSnapshot.docs) {
        const bookingData = booking.data();
        if (bookingData['id'] === BookingId) {
          this.bookingdata = {
            "BookingId": bookingData["id"],
            "name": bookingData["customer"].name,
            "contact": bookingData["customer"].phoneNumber,
            "eventname": bookingData["event"].eventName,
            "slabname": bookingData["slab"].name,
            "varientname": bookingData["variant"].name,
            "date":bookingData["paymentDetail"].date,
            "time":bookingData["paymentDetail"].time, 
            "price": bookingData["paymentDetail"].totalPrice,
            "tickets": bookingData["totalMember"],
            "status":bookingData["paymentDetail"].paymentStatus,
            "member":bookingData["memberDetail"]
          };
          this.members=bookingData["memberDetail"],
          this.userId = userId;
          break;
          
        }
      }
    
  }
  selectTab(index: number) {
    this.selectedTab = index
  }
 
  
}
