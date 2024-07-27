import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from "../../../sharedComponent/header-with-back/header-with-back.component";
import { EventServiceService } from '../../event-service.service';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
@Component({
  selector: 'app-slab-list',
  standalone: true,
  imports: [CommonModule, HeaderWithBackComponent],
  templateUrl: './slab-list.component.html',
  styleUrl: './slab-list.component.scss'
})
export class SlabListComponent {
  //eventId: any;
  movetovarient(){
    this.router.navigate(['varients']);
  }
  // items = [
  //   {
  //     image: '/assets/homepage/slabimage.svg',  
  //     title: 'Panchganga Slab'
  //   },
  //   {
  //     image: '/assets/homepage/slabimage.svg',  
  //     title: 'Assi Slab'
  //   },
  //   {
  //     image: '/assets/homepage/slabimage.svg',  
  //     title: 'Panchganga Slab'
  //   },
  //   {
  //     image: '/assets/homepage/slabimage.svg',  
  //     title: 'Assi Slab'
  //   }
  // ];
  constructor(private router: Router, private eventservice: EventServiceService, private firestore: Firestore) { }
  slabList: { name: string, image: string }[] = [];

  async logEventsSnapshot(): Promise<void> {
    try {
      const slabSnapshot = await this.eventservice.getevents();
      for (const event of slabSnapshot.docs) {
        const slabsSnapshot = await getDocs(
          collection(this.firestore, "events", event.id, "slab-variant")
        );
  
        slabsSnapshot.docs.forEach(slabs => {
          const slabData = slabs.data();
          this.slabList.push({
            name: slabData['name'],
            image: slabData['image']
          });
        });
      }
    } catch (error) {
      console.error('Error fetching events or bookings:', error);
    }
  }
  // async logEventsSnapshot(): Promise<void> {
  //   try {
  //     const slabSnapshot = await this.eventservice.getevents();
  //     for (const event of slabSnapshot.docs) {
  //       const slabsSnapshot = await getDocs(
  //         collection(this.firestore, "events")
  //       );
  
  //       slabsSnapshot.docs.forEach(slabs => {
  //         const slabData = slabs.data();
  //         console.log(slabData)
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching events or bookings:', error);
  //   }
  // }

  ngOnInit() {
    this.logEventsSnapshot();
  }
}