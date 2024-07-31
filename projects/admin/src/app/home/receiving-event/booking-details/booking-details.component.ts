import { Component, inject, input, Input } from '@angular/core';
import { HeaderWithBackComponent } from "../../../sharedComponent/header-with-back/header-with-back.component";
import { CommonModule } from '@angular/common';
import { EditMemberDetailComponent } from '../edit-member-detail/edit-member-detail.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeleteBtnComponent } from "../../../../../../shared-ui/src/delete-btn/delete-btn.component";
import { Firestore } from '@angular/fire/firestore';
import { booking } from '../booking.structure';
import { ReceivingEventComponent } from '../receiving-event.component';


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
  ngOnInit(){
  console.log(this.bookingdata)
}
  // @Input() bookingdata:booking={
  //   BookingId:'',
  //   name:'',
  //   contact:'',
  //   eventname:'',
  //   slabname:'',
  //   varientname:'',
  //   price:'',
  //   tickets:''
  // }
  @Input() bookingdata: booking | null = null;

  constructor(private bottomSheet: MatBottomSheet, private firestore:Firestore ) {}



  selectedTab: number = 0;
  members: Member[] = [
    {
      name: 'Member 1',
      Aadhar:'147852369963',
      Gender: 'Male',
      Contact:'1478523699'
    },
    {
      name: 'Member 2',
      Aadhar:'1478 5236 9963',
      Gender: 'Male',
      Contact:'147852369963'
    }
   
  ];

  selectTab(index: number) {
    this.selectedTab = index
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
